//----------------------------------------------------------------------------
// Global Variables

var gll = null; // WebGL context
var glr = null;

var scenel = null;
var scener = null;

var shaderProgram = null;
var triangleVertexPositionBuffer = null;
var triangleVertexNormalBuffer = null;

// The GLOBAL transformation parameters
var globalAngleYY = 0.0;
var globalTx = 0.0;
var globalTy = -1;
var globalTz = 0.0;

// GLOBAL Animation controls
var globalRotationYY_ON = 1;
var globalRotationYY_DIR = 1;
var globalRotationYY_SPEED = 1;

// To allow choosing the way of drawing the model triangles
var primitiveType = 2;

// To allow choosing the projection type
var projectionType = 1; // TODO ortogonal não funciona muito bem


//----------------------------------------------------------------------------
// The WebGL code
//

// Animation --- Updating transformation parameters

var lastTime = 0;

function animate( scene ) {

    var timeNow = new Date().getTime();
    if( lastTime != 0 ) {
        var elapsed = timeNow - lastTime;
        // do stuff to animate scene
        // namely rotate objects and stuff

        scene.objects[0].deltarotate(1,0,0);
        scene.objects[1].deltarotate(2,1,0.3);
        // scene.objects[3].deltarotate(0,1,0);
    }

    lastTime = timeNow;
}


//----------------------------------------------------------------------------

// Timer

function tick() {
    requestAnimFrame(tick);

    animate( scenel );
    animate( scener );

    scenel.drawScene(projectionType, primitiveType);
    scener.drawScene(projectionType, primitiveType);
}

//
//  User Interaction
//

function outputInfos(){
}

//----------------------------------------------------------------------------

function setEventListeners(){

    // OBJ File loading
    document.getElementById("obj-file").onchange = function(){
        var file = this.files[0];
        var obj_model = Model.getFromFile(file)
        // console.log(obj_model);
   }


    // Adapted from:
    // http://stackoverflow.com/questions/23331546/how-to-use-javascript-to-read-local-text-file-and-read-line-by-line
    document.getElementById("file").onchange = function(){
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function( progressEvent ){
            // Entire file read as a string
            // The tokens/values in the file
            // Separation between values is 1 or mode whitespaces

            var tokens = this.result.split(/\s\s*/);
            // Array of values; each value is a string
            var numVertices = parseInt( tokens[0] );
            // For every vertex we have 3 floating point values
            var i, j;
            var aux = 1;
            var newVertices = [];
            for( i = 0; i < numVertices; i++ ) {
                for( j = 0; j < 3; j++ ) {
                    newVertices[ 3 * i + j ] = parseFloat( tokens[ aux++ ] );
                }
            }

            // Assigning to the current model
            vertices += newVertices.slice();
            computeVertexNormals( vertices, normals );

            // To render the model just read
            initBuffers();

            // RESET the transformations - NEED AUXILIARY FUNCTION !!
            tx = ty = tz = 0.0;

            angleXX = angleYY = angleZZ = 0.0;

            sx = sy = sz = 0.5;
        };

        // Entire file read as a string
        reader.readAsText( file );
    }

    // Dropdown list
    var list = document.getElementById("rendering-mode-selection");
    list.addEventListener("click", function(){
        // Getting the selection
        var mode = list.selectedIndex;
        switch(mode){
            case 0 : primitiveType = gl.TRIANGLES;
                break;
            case 1 : primitiveType = gl.LINE_LOOP;
                break;
            case 2 : primitiveType = gl.POINTS;
                break;
        }
    });

    var cube_button = document.getElementById("add-cube");
    cube_button.addEventListener("click",function(){
        scene.camera.deltaRotate(0,15,0);
    });

    var sphere_button = document.getElementById("add-pyramid");
    sphere_button.addEventListener("click",function(){
        scene.camera.deltaRotate(0,-15,0);
    });


    document.addEventListener('keydown', function(event){
        switch(event.keyCode){
            case 37: // rotate left LEFTKEY
                scene.camera.deltaRotate(0,-10,0);
                break;
            case 38: // rotate up UPKEY
                scene.camera.deltaRotate(10,0,0);
                break;
            case 39: // rotate right RIGHTKEY
                scene.camera.deltaRotate(0,10,0);
                break;
            case 40: // rotate down DOWNKEY
                scene.camera.deltaRotate(-10,0,0);
                break;
            case 87: // move front W
                scene.camera.translate(0,0,0.25);
                // console.log(scene.camera.cameraPosition);
                break;
            case 83: // move back S
                scene.camera.translate(0,0,-0.25);
                // console.log(scene.camera.cameraPosition);
                break;
            case 73: // move UP
                scene.camera.translate(0,-0.25,0);
                // console.log(scene.camera.cameraPosition);
                break;
            case 75: // move DOWN
                scene.camera.translate(0,0.25,0);
                // console.log(scene.camera.cameraPosition);
                break;
            default:
                console.log(event.keyCode);
                break;
        }
    });
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//----------------------------------------------------------------------------
// WebGL Initialization

function initWebGL( canvas ) {
    try {
        // Create the WebGL context
        // Some browsers still need "experimental-webgl"
        var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        // DEFAULT: The viewport occupies the whole canvas
        // DEFAULT: The viewport background color is WHITE
        // NEW - Drawing the triangles defining the model

        primitiveType = gl.TRIANGLES;

        // DEFAULT: Face culling is DISABLED
        // Enable FACE CULLING
        //gl.enable( gl.CULL_FACE );

        // DEFAULT: The BACK FACE is culled!!
        // The next instruction is not needed...
        //gl.cullFace( gl.BACK );

        // Enable DEPTH-TEST
        gl.enable( gl.DEPTH_TEST );
        return gl;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry! :-(");
    }
}


function initScene( name , gl , shaderProgram){

    var scene = new Scene(name, gl, shaderProgram);

    var cube_model = Model.getCubeModel();
    var pyramid_model = Model.getPyramidModel();
    var floor_model = Model.getFloorModel();
    var bck_model = Model.getBackgroundModel();

    var camera = new Camera();
    camera.rotate(0,30,0);
    camera.lookAt(0,0,0);
    camera.translate(0,0,0.3);

    scene.addCamera(camera);
    scene.addModel(cube_model);
    scene.addModel(pyramid_model);
    scene.addModel(floor_model);
    scene.addModel(bck_model);

    // Criação objetos
    var cube = scene.addObject(cube_model.gl_model);
    cube.positionAt(0, 0.25, 0);
    cube.material.kAmbient(0.25,0.20,0.07);
    cube.material.kDiffuse(0.75,0.60,0.23);
    cube.material.kSpecular(0.63,0.56,0.37);
    cube.material.nPhongs(51.2);

    var pyramid = scene.addObject(pyramid_model.gl_model);
    pyramid.positionAt(0.4, -0.5, 0);
    pyramid.material.kDiffuse(1,0,0);
    var floor = scene.addObject(floor_model.gl_model);
    // floor.positionAt(0,0,0);
    floor.material.kDiffuse(1,1,1);
    var background = scene.addObject(bck_model.gl_model);
    background.material.kAmbient(0.21,0.13,0.05);
    background.material.kDiffuse(0.71,0.43,0.18);    
    background.material.kSpecular(0.39,0.27,0.17);
    background.material.nPhongs(25.6);
    background.positionAt(0,0,0);
    // Criação da luz
    var light_source = new LightSource();
    light_source.positionAt(0.5,0.5,0.5);
    light_source.type(1);
    light_source.switchOn();
    // light_source.switchRotYYOn();
    scene.addLightSource(light_source);
    return scene;
}

//----------------------------------------------------------------------------

function runWebGL() {
    var canvasl = document.getElementById("canvasl");
    var canvasr = document.getElementById("canvasr");

    gll = initWebGL( canvasl );
    glr =initWebGL( canvasr );

    shaderPrograml = initShaders( gll );
    shaderProgramr = initShaders( glr );

    setEventListeners();

    scenel = initScene("scene1", gll , shaderPrograml);
    scener = initScene("scene2", glr , shaderProgramr);

    scenel.light_sources[0].switchOff();
    tick();

    outputInfos();
}



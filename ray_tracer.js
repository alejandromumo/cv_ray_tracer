//----------------------------------------------------------------------------
// Global Variables

var gll = null; // WebGL context
var glr = null;
var frustum = null; // pyramid representing right camera on left scene
var viewVolume = null;

var scenel = null;
var scener = null;

var shaderProgram = null;
var triangleVertexPositionBuffer = null;
var triangleVertexNormalBuffer = null;

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
        //scene.objects[0].deltarotate(1,0,0);
        //scene.objects[1].deltarotate(2,1,0.3);
        //scene.objects[4].deltarotate(0,1,0);
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
            case 0 : primitiveType = scenel.gl.TRIANGLES;
                break;
            case 1 : primitiveType = scenel.gl.LINE_LOOP;
                break;
            case 2 : primitiveType = scenel.gl.POINTS;
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
                scener.camera.deltaRotate(0,10,0);
         //       frustum.deltarotate(0,10,0);
                viewVolume.deltarotate(0,10,0);
                break;
            case 38: // rotate up UPKEY
                scener.camera.deltaRotate(-10,0,0);
          //      frustum.deltarotate(-10,0,0);
                viewVolume.deltarotate(-10,0,0);
                break;
            case 39: // rotate right RIGHTKEY
                scener.camera.deltaRotate(0,-10,0);
            //    frustum.deltarotate(0,-10,0);
                viewVolume.deltarotate(0,-10,0);
                break;
            case 40: // rotate down DOWNKEY
                scener.camera.deltaRotate(10,0,0);
           //     frustum.deltarotate(10,0,0);
                viewVolume.deltarotate(10,0,0);
                break;
            case 87: // move front W
                scener.camera.translate(0,0,-0.25);
           //     frustum.translate(0,0,-0.25);
                viewVolume.translate(0,0,-0.25);
                break;
            case 83: // move back S
                scener.camera.translate(0,0,0.25);
           //     frustum.translate(0,0,0.25);
                viewVolume.translate(0,0,0.25);
                break;
            case 73: // move UP
                scener.camera.translate(0,0.25,0);
           //     frustum.translate(0,0.25,0);
                viewVolume.translate(0,0.25,0);
                break;
            case 75: // move DOWN
                scener.camera.translate(0,-0.25,0);
           //     frustum.translate(0,-0.25,0);
                viewVolume.translate(0,-0.25,0);
                break;
            case 65: // move LEFT A
                scener.camera.translate(-0.25,0,0);
           //     frustum.translate(-0.25,0,0);
                viewVolume.translate(-0.25,0,0);
                break;
            case 68: // move RIGHT D
                scener.camera.translate(0.25,0,0);
           //     frustum.translate(0.25,0,0);
                viewVolume.translate(0.25,0,0);
                break;
            default:
                console.log(event.keyCode);
                break;
        }
    });

    canvasr.addEventListener("mousedown", function(event){
        var x = new Number();
        var y = new Number();
        var canvas = document.getElementById("canvasr");

        if (event.x != undefined && event.y != undefined)
        {
            x = event.x;
            y = event.y;
        }
        else // Firefox para o Manu
        {
            x = event.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
        }
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;

        var pX = (x+0.5)/350
        var pY = (y+0.5)/350

        pX = (2 * pX) -1
        pY = 1 - (2* pY)

        var ray = new Ray(  scener.camera.cameraPosition[0],
                            scener.camera.cameraPosition[1],
                            scener.camera.cameraPosition[2],
                            pX, pY, scener.camera.cameraPosition[2]-(scener.far-scener.near))

        ray.logRay()
        var Ray_Model = Model.getRayModel(ray.dir);
        console.log(Ray_Model)
        scenel.addModel(Ray_Model)
        var ray = scenel.addObject(Ray_Model.gl_model)
        ray.positionAt( scener.camera.cameraPosition[0],
                        scener.camera.cameraPosition[1],
                        scener.camera.cameraPosition[2]);
        ray.scale(100,100,100)
    }, false)
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
    var sphere_model = Model.getSphereModel();

    scene.addModel(cube_model);
    scene.addModel(pyramid_model);
    scene.addModel(floor_model);
    scene.addModel(bck_model);
    scene.addModel(sphere_model);

    // Criação objetos
    var cube = scene.addObject(cube_model.gl_model);
    cube.positionAt(-0.75, -0.75, -0.75);
    cube.material.kAmbient(0.25,0.20,0.07);
    cube.material.kDiffuse(0.75,0.60,0.23);
    cube.material.kSpecular(0.63,0.56,0.37);
    cube.material.nPhongs(51.2);

    var pyramid = scene.addObject(pyramid_model.gl_model);
    pyramid.positionAt( -0.75, 0.5,0);
    pyramid.material.kDiffuse(1,0,0);

    var floor = scene.addObject(floor_model.gl_model);
    floor.material.kDiffuse(1,1,1);

    var ceiling = scene.addObject(floor_model.gl_model);
    ceiling.material.kAmbient(0.21,0.13,0.05);
    // +2 bcs floor model is defined at -1;
    ceiling.rotate(0,0,180)
    ceiling.positionAt(0,0,0);

    var background = scene.addObject(bck_model.gl_model);
    background.material.kAmbient(0.21,0.13,0.05);
    background.material.kDiffuse(0.71,0.43,0.18);
    background.material.kSpecular(0.39,0.27,0.17);
    background.material.nPhongs(25.6);
    background.positionAt(0,0,0);

    var leftwall = scene.addObject(bck_model.gl_model);
    leftwall.material.kAmbient(0.21,0.13,0.05);
    leftwall.material.kDiffuse(0.71,0.43,0.18);
    leftwall.material.kSpecular(0.39,0.27,0.17);
    leftwall.material.nPhongs(25.6);
    leftwall.rotate(0,90,0)
    leftwall.positionAt(0,0,0);

    var rightwall = scene.addObject(bck_model.gl_model);
    rightwall.material.kAmbient(0.21,0.13,0.05);
    rightwall.material.kDiffuse(0.71,0.43,0.18);
    rightwall.material.kSpecular(0.39,0.27,0.17);
    rightwall.material.nPhongs(25.6);
    rightwall.rotate(0,270,0)
    rightwall.positionAt(0,0,0);

    var sphere = scene.addObject(sphere_model.gl_model);
    sphere.positionAt(0.55,-0.65,0.55);
    sphere.material.kAmbient(0.21,0.13,0.05);
    sphere.material.kDiffuse(0.71,0.43,0.18);    
    sphere.material.kSpecular(0.39,0.27,0.17);
    sphere.material.nPhongs(25.6);
    sphere.scale(0.35,0.35,0.35);

    // Criação da luz
    var light_source = new LightSource();
    light_source.positionAt(0,0.2,1.30);
    light_source.type(1); // 1 -> omni , 0 -> directional
    light_source.switchOn();
    scene.addLightSource(light_source);
    return scene;
}

function addFrustum(scene){
    //var pyramid_model = Model.getPyramidModel();
    //scene.addModel(pyramid_model);
    //var pyramid = scene.addObject(pyramid_model.gl_model);
    //pyramid.positionAt(-0.125,0.125,3.5);
    //pyramid.rotate(90,0,0);
    //pyramid.material.kDiffuse(0,0,1);
    //return pyramid
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
    frustum = addFrustum(scenel)
    var camera = new Camera();
    //camera.rotate(0,55,0)
    camera.positionAt(0,0,6);
    //camera.positionAt(0,0,6);
    scenel.addCamera(camera);
    //scenel.drawScene(projectionType, primitiveType);

    scener = initScene("scene2", glr , shaderProgramr);
    var camera2= new Camera();
    camera2.positionAt(0,0,3);
    scener.addCamera(camera2);
    scener.fieldofview = 30;
    scener.far = 10;
    scener.near = 0.5;
    //scener.drawScene(projectionType, primitiveType);

    //scenel.light_sources[0].switchOff();
    var frustum_model = Model.getFrustumModel(scener.fieldofview, scener.near, scener.far, scener.camera.cameraPosition);
    scenel.addModel(frustum_model);
    viewVolume = scenel.addObject(frustum_model.gl_model);
    viewVolume.material.kAmbient(0.21,0.13,0.05);
    viewVolume.material.kDiffuse(0.71,0.43,0.18);
    viewVolume.material.kSpecular(0.39,0.27,0.17);
    viewVolume.material.nPhongs(25.6);

    tick();

    outputInfos();
}



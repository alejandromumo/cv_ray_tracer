//----------------------------------------------------------------------------
// Global Variables

var gl = null; // WebGL context
var scene = null;

var shaderProgram = null;
var triangleVertexPositionBuffer = null;
var triangleVertexColorBuffer = null;

// The GLOBAL transformation parameters
var globalAngleYY = 0.0;
var globalTz = 0.0;

// GLOBAL Animation controls
var globalRotationYY_ON = 1;
var globalRotationYY_DIR = 1;
var globalRotationYY_SPEED = 1;

// Local Animation controls
var rotationXX_ON = 1;
var rotationXX_DIR = 1;
var rotationXX_SPEED = 1;
var rotationYY_ON = 1;
var rotationYY_DIR = 1;
var rotationYY_SPEED = 1;
var rotationZZ_ON = 1;
var rotationZZ_DIR = 1;
var rotationZZ_SPEED = 1;
var angleXX = 0;
var angleYY = 0;
var angleZZ = 0;

// To allow choosing the way of drawing the model triangles
var primitiveType = 2;

// To allow choosing the projection type
var projectionType = 1;





var num_cubes = 0;
var num_pyramids = 0;


//----------------------------------------------------------------------------
// The WebGL code
//

// Animation --- Updating transformation parameters

var lastTime = 0;

function animate() {

    var timeNow = new Date().getTime();
    if( lastTime != 0 ) {
        var elapsed = timeNow - lastTime;
        // do stuff to animate scene
        // namely rotate objects and stuff

        scene.objects[0].deltarotate(10,0,0);
        scene.objects[1].deltarotate(20,10,3);

    }

    lastTime = timeNow;
}


//----------------------------------------------------------------------------

// Timer

function tick() {
    requestAnimFrame(tick);

    animate();

    scene.drawScene(projectionType, primitiveType);
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
        num_cubes += 1;
    });

    var sphere_button = document.getElementById("add-pyramid");
    sphere_button.addEventListener("click",function(){
        num_pyramids += 1;
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
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

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

    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry! :-(");
    }
}


function initScene( name ){

    scene = new Scene(name);

    var cube_model = Model.getCubeModel();
    var pyramid_model = Model.getPyramidModel();
    var floor_model = Model.getFloorModel();
    var bck_model = Model.getBackgroundModel();

    scene.addModel(cube_model);
    scene.addModel(pyramid_model);
    scene.addModel(floor_model);
    scene.addModel(bck_model);

    var cube = scene.addObject(cube_model.gl_model);
    cube.translate(0, 0.4, 0);
    var pyramid = scene.addObject(pyramid_model.gl_model);
    pyramid.translate(0.4, -0.5, 0);
    scene.addObject(floor_model.gl_model);
}

//----------------------------------------------------------------------------

function runWebGL() {
    var canvas = document.getElementById("my-canvas");
    initWebGL( canvas );

    shaderProgram = initShaders( gl );

    setEventListeners();

    initScene();
    tick();

    outputInfos();
}



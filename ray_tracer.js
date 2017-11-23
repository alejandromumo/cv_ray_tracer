//----------------------------------------------------------------------------
// Global Variables

var gll = null; // WebGL context
var glr = null;
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

// Models
var cube_model = null;
var pyramid_model = null;
var floor_model = null;
var bck_model = null;
var sphere_model = null;


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

    animate( scener );
    animate( scenel );

    scener.drawScene(projectionType, primitiveType);
    scenel.drawScene(projectionType, primitiveType);
}

//----------------------------------------------------------------------------

function setEventListeners(){
    document.addEventListener('keydown', function(event){
        switch(event.keyCode){
            case 37: // rotate left LEFTKEY
                scener.camera.deltaRotate(0,10,0);
                viewVolume.deltarotate(0,10,0);
                break;
            case 38: // rotate up UPKEY
                scener.camera.deltaRotate(-10,0,0);

                viewVolume.deltarotate(-10,0,0);
                break;
            case 39: // rotate right RIGHTKEY
                scener.camera.deltaRotate(0,-10,0);
                viewVolume.deltarotate(0,-10,0);
                break;
            case 40: // rotate down DOWNKEY
                scener.camera.deltaRotate(10,0,0);
                viewVolume.deltarotate(10,0,0);
                break;
            case 87: // move front W
                scenel.camera.deltaRotate(-10,0,0);
                break;
            case 83: // move back S
                scenel.camera.deltaRotate(10,0,0);
                break;
            case 65: // move LEFT A
                scenel.camera.deltaRotate(0,10,0);
                break;
            case 68: // move RIGHT D
                scenel.camera.deltaRotate(0,-10,0);
                break;
            case 13:
                //console.log("Scene right: ");
                //console.log(scener);
                //console.log("Scene left: ");
                //console.log(scenel);
                console.log(scener.camera.viewMatrix)
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
        var rect = canvas.getBoundingClientRect()

        x = (event.clientX-rect.left)/(rect.right-rect.left)*canvas.width,
        y = (event.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height

        var d = vec4()
        d[0] = x - (canvas.width/2)
        d[1] = (canvas.height/2)-y
        d[2] = -(canvas.height/2)/( Math.tan( radians(scener.fieldofview) / 2))


        var vM = scener.camera.viewMatrix

        var dir = vec4()
        dir = multiplyVectorByMatrix(matrix_invert(vM),d)

        var ray = new Ray(  scener.camera.cameraPosition[0],
                            scener.camera.cameraPosition[1],
                            scener.camera.cameraPosition[2],
                            dir[0],dir[1],dir[2])


        ray.drawRay(scenel,
                    scener.camera.cameraPosition[0],
                    scener.camera.cameraPosition[1],
                    scener.camera.cameraPosition[2])

            }, false)
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
        // gl.enable( gl.CULL_FACE );

        // DEFAULT: The BACK FACE is culled!!
        // The next instruction is not needed...
        // gl.cullFace( gl.BACK );

        // Enable DEPTH-TEST
        gl.enable( gl.DEPTH_TEST );
        return gl;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry! :-(");
    }
}

//----------------------------------------------------------------------------
// Scenes initialization
function initScenes(canvasl, canvasr)
{
    // Initialize gl contexts and shader programs for each scene
    glr = initWebGL(canvasr);
    shaderProgramRight = initShaders(glr);
    gll = initWebGL(canvasl);
    shaderProgramLeft = initShaders(gll);

    // Initialize available models
    initModels();

    // Initialize scenes and add models 
    //  and common objects to each of them
    scener = initScene("right scene", glr, shaderProgramRight);
    scenel = initScene("left scene", gll, shaderProgramLeft);

    // Populate each scene as desired
    populateRightScene();
    populateLeftScene();
}

function initScene( name , gl , shaderProgram){
    var scene = new Scene(name, gl, shaderProgram);

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

    // var ceiling = scene.addObject(floor_model.gl_model);
    // ceiling.material.kAmbient(0.21,0.13,0.05);
    // ceiling.rotate(0,0,180)
    // ceiling.positionAt(0,0,0);

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
    return scene;
}

function populateRightScene()
{
    // Add light to right scene
    var light_source = new LightSource();
    light_source.positionAt(0,0,0.5);
    light_source.type(0); // 1 -> omni , 0 -> directional
    light_source.switchOn();
    scener.addLightSource(light_source);

    // Add camera into right scene
    var camera = new Camera();
    camera.radius = 4;
    camera.lookAt(0,0,0);
    scener.addCamera(camera);

    // Perspective parameters for right scene
    scener.fieldofview = 35;
    scener.far = 10;
    scener.near = 1;
}

function populateLeftScene()
{
    // Add light to left scene
    var light_source = new LightSource();
    light_source.positionAt(0,0.2,1.30);
    light_source.type(0); // 1 -> omni , 0 -> directional
    light_source.switchOn();
    scenel.addLightSource(light_source);

    // Add camera to left scene
    var camera = new Camera();
    //camera.rotate(10,40,0);
    //camera.positionAt(0,0,10);
    camera.lookAt(0,0,0);
    camera.radius = 6;
    scenel.addCamera(camera);

    // Perspective parameters for left scene
    scenel.fieldofview = 35;
    scenel.far = 10;
    scenel.near = 1;

    // View Volume representing right scene view volume
//    var frustum_model = Model.getFrustumModel(scener.fieldofview, scener.near, scener.far, scener.camera.cameraPosition);
//    scenel.addModel(frustum_model);
//    viewVolume = scenel.addObject(frustum_model.gl_model);
//    viewVolume.positionAt(0,0,3)
//    viewVolume.material.kAmbient(0.21,0.13,0.05);
//    viewVolume.material.kDiffuse(0.71,0.43,0.18);
//    viewVolume.material.kSpecular(0.39,0.27,0.17);
//    viewVolume.material.nPhongs(25.6);
}

function initModels()
{
    cube_model = Model.getCubeModel();
    pyramid_model = Model.getPyramidModel();
    floor_model = Model.getFloorModel();
    bck_model = Model.getBackgroundModel();
    sphere_model = Model.getSphereModel();
}



//----------------------------------------------------------------------------

function runWebGL() {
    var canvasl = document.getElementById("canvasl");
    var canvasr = document.getElementById("canvasr");

    initScenes(canvasl, canvasr);

    setEventListeners();

    tick();
}



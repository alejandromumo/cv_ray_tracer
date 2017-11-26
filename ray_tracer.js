//----------------------------------------------------------------------------
// Global Variables

var gll = null; // WebGL context
var glr = null;
var viewVolume = null;

var currScene = 3;

var scenel = null;
var scener = null;

var scener1 = null;
var scenel1 = null;
var scener2 = null;
var scenel2 = null;
var scener3 = null;
var scenel3 = null;

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

    scener.drawScene(projectionType, primitiveType, null);
    scenel.drawScene(projectionType, primitiveType, scener);
}

//----------------------------------------------------------------------------
function loadScene3(){
    console.log("Load Scene3")
    if(currScene == 3) return;
    currScene = 3
    scener3.initBuffers()
    scenel3.initBuffers()
    scener = scener3
    scenel = scenel3
}

function loadScene2(){
    console.log("Load Scene2")
    if(currScene == 2) return;
    currScene = 2
    scener2.initBuffers()
    scenel2.initBuffers()
    scener = scener2
    scenel = scenel2
}

function loadScene1(){
    console.log("Load Scene1")
    if(currScene == 1) return;
    currScene = 1
    scener1.initBuffers()
    scenel1.initBuffers()
    scener = scener1
    scenel = scenel1
}

function setEventListeners(){
    document.addEventListener('keydown', function(event){
        switch(event.keyCode){
            case 37: // rotate left LEFTKEY
                scener.camera.deltaRotate(0,10,0);
                break;
            case 38: // rotate up UPKEY
                scener.camera.deltaRotate(-10,0,0);

                break;
            case 39: // rotate right RIGHTKEY
                scener.camera.deltaRotate(0,-10,0);
                break;
            case 40: // rotate down DOWNKEY
                scener.camera.deltaRotate(10,0,0);
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
                console.log("Scene right: ");
                console.log(scener);
                console.log("Scene left: ");
                console.log(scenel);
                // console.log(scener.camera.viewMatrix)
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
        d[0] = x -(canvas.width/2)
        d[1] = (canvas.height/2)-y
        d[2] = -(canvas.height/2)/( Math.tan( radians(scener.fieldofview) / 2))


        var vM = scener.camera.viewMatrix;

        var dir = vec4();
        dir = multiplyVectorByMatrix(matrix_invert(vM),d)

        var ray = new Ray(  scener.camera.cameraPosition[0],
                            scener.camera.cameraPosition[1],
                            scener.camera.cameraPosition[2],
                            dir[0],dir[1],dir[2])

        rayCast(ray,3);

            }, false)
}

// Calculate nearest intersection of a ray
function get_first_intersection(ray)
{


        var nearest = vec3()
        var dnearest = 9999999;
        var distance;
        var normal = vec3()
        var point = vec3()
        var sphere_center = vec3();
        var nearest_normal = vec3();
        var tmp = null;
        var found = false;
        // Calculate nearest intersection
        for(var i = 0 ; i < scener.objects.length ; i++){
            if( scener.objects[i].glmodel.model.name === "sphere" ){
                
                tmp = Ray.testSphereIntersectionSphere(ray, scener.objects[i]);
                // console.log(point);
                // The Ray does not intersect this object
                if (tmp == null ){
                    continue;
                }
                point = tmp[0];
                sphere_center = tmp[1];

                distance =  distanceBetween2Points(scener.camera.cameraPosition, point)
                if (distance < dnearest){
                    dnearest = distance;
                    nearest = point;
                    nearest_normal = subtract(point, sphere_center);
                    normalize(nearest_normal);
                    found = true;
                }
            }
        }

        // No object was intersected
        if (found == false ){
            console.log("No intersection");
            return null;
        }


        return [nearest,nearest_normal];
}

// Recursive function to draw initial ray and reflections
function rayCast(ray, depth)
{
    var tmp = get_first_intersection(ray);
    if(ray == null || depth == 0 || tmp == null)
        return;
    // compute nearest intersection of a given ray
    var nearest = tmp[0];
    var nearest_normal = tmp[1];

    if(nearest != null)
    {
        // draw the given ray
        trace_ray(ray.origin, nearest);
        // compute the reflection of given ray into the nearest point
        rayCast(get_reflected_ray(ray, nearest, nearest_normal), depth - 1); // 
    }
    else
        return null;
}
    
// Calculate reflected ray
function get_reflected_ray(origin_ray, nearest, nearest_normal)
{
    var c1 = dotProduct(origin_ray.dir, nearest_normal);
    var reflected_direction  = vec3();
    reflected_direction[0] = origin_ray.dir[0] - (2 * nearest_normal[0] * c1) ;
    reflected_direction[1] = origin_ray.dir[1] - (2 * nearest_normal[1] * c1) ;
    reflected_direction[2] = origin_ray.dir[2] - (2 * nearest_normal[2] * c1) ;

    var dest_point_x = reflected_direction[0]  + nearest[0];
    var dest_point_y = reflected_direction[1]  + nearest[1];
    var dest_point_z = reflected_direction[2]  + nearest[2];

    var reflected_ray = new Ray(nearest[0],nearest[1],nearest[2],
                                dest_point_x, dest_point_y, dest_point_z);

    return reflected_ray;
}

// Draw a ray
function trace_ray(origin, dest)
{
    var ray = new Ray(  origin[0],
                        origin[1],
                        origin[2],
                        dest[0],dest[1],dest[2]);
    var distance = distanceBetween2Points(origin, dest);

    ray.size = distance;
    ray.drawRay(scenel,
            origin[0],
            origin[1],
            origin[2]);
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
    scener1 = initScene1("right-scene1", glr, shaderProgramRight);
    scenel1 = initScene1("left-scene1", gll, shaderProgramLeft);
    scener1 = populateRightScene(scener1);
    scenel1 = populateLeftScene(scenel1);

    scener2 = initScene2("right-scene2", glr, shaderProgramRight);
    scenel2 = initScene2("left-scene2", gll, shaderProgramLeft);
    scener2 = populateRightScene(scener2);
    scenel2 = populateLeftScene(scenel2);
    
    scener3 = initScene3("right-scene3", glr, shaderProgramRight);
    scenel3 = initScene3("left-scene3", gll, shaderProgramLeft);
    scener3 = populateRightScene(scener3);
    scenel3 = populateLeftScene(scenel3);
    
    scener3.initBuffers()
    scenel3.initBuffers()

    scener = scener3
    scenel = scenel3

    
}

function initScene3( name , gl , shaderProgram){
    let scene = new Scene(name, gl, shaderProgram);

    scene.addModel(cube_model);
    scene.addModel(pyramid_model);
    scene.addModel(floor_model);
    scene.addModel(bck_model);
    scene.addModel(sphere_model);

    // Criação objetos
    let cube = scene.addObject(cube_model.gl_model);
    cube.positionAt(-0.75, -0.75, -0.75);
    cube.material.kAmbient(0.25,0.20,0.07);
    cube.material.kDiffuse(0.75,0.60,0.23);
    cube.material.kSpecular(0.63,0.56,0.37);
    cube.material.nPhongs(51.2);

    let pyramid = scene.addObject(pyramid_model.gl_model);
    pyramid.positionAt( -0.75, 0.5,0);
    pyramid.material.kDiffuse(1,0,0);

    let floor = scene.addObject(floor_model.gl_model);
    floor.material.kDiffuse(1,1,1);

    let background = scene.addObject(bck_model.gl_model);
    background.material.kAmbient(0.21,0.13,0.05);
    background.material.kDiffuse(0.71,0.43,0.18);
    background.material.kSpecular(0.39,0.27,0.17);
    background.material.nPhongs(25.6);
    background.positionAt(0,0,0);

    let leftwall = scene.addObject(bck_model.gl_model);
    leftwall.material.kAmbient(0.21,0.13,0.05);
    leftwall.material.kDiffuse(0.71,0.43,0.18);
    leftwall.material.kSpecular(0.39,0.27,0.17);
    leftwall.material.nPhongs(25.6);
    leftwall.rotate(0,90,0)
    leftwall.positionAt(0,0,0);

    let rightwall = scene.addObject(bck_model.gl_model);
    rightwall.material.kAmbient(0.21,0.13,0.05);
    rightwall.material.kDiffuse(0.71,0.43,0.18);
    rightwall.material.kSpecular(0.39,0.27,0.17);
    rightwall.material.nPhongs(25.6);
    rightwall.rotate(0,270,0)
    rightwall.positionAt(0,0,0);

    let sphere = scene.addObject(sphere_model.gl_model);
    sphere.positionAt(0.55,-0.65,0.55);
    sphere.material.kAmbient(0.21,0.13,0.05);
    sphere.material.kDiffuse(0.71,0.43,0.18);    
    sphere.material.kSpecular(0.39,0.27,0.17);
    sphere.material.nPhongs(25.6);
    sphere.scale(0.35,0.35,0.35);

    let sphere2 = scene.addObject(sphere_model.gl_model);
    sphere2.positionAt(0.55,-0.65,-0.5);
    sphere2.material.kAmbient(0.21,0.13,0.05);
    sphere2.material.kDiffuse(0.71,0.43,0.18);    
    sphere2.material.kSpecular(0.39,0.27,0.17);
    sphere2.material.nPhongs(25.6);
    sphere2.scale(0.35,0.35,0.35);

    let sphere3 = scene.addObject(sphere_model.gl_model);
    sphere3.positionAt(-0.10,-0.65, 0.05);
    sphere3.material.kAmbient(0.21,0.13,0.05);
    sphere3.material.kDiffuse(0.71,0.43,0.18);    
    sphere3.material.kSpecular(0.39,0.27,0.17);
    sphere3.material.nPhongs(25.6);
    sphere3.scale(0.35,0.35,0.35);
    return scene;
}


function initScene2( name , gl , shaderProgram){
    let scene = new Scene(name, gl, shaderProgram);

    scene.addModel(floor_model);
    scene.addModel(sphere_model);

    let floor = scene.addObject(floor_model.gl_model);
    floor.material.kAmbient(0,1,0);    
    floor.material.kDiffuse(1,1,1);
    floor.scale(5,1,5)

    let sphere = scene.addObject(sphere_model.gl_model);
    sphere.positionAt(0.55,-0.65,0.55);
    sphere.material.kAmbient(0.21,0.13,0.05);
    sphere.material.kDiffuse(0.71,0.43,0.18);    
    sphere.material.kSpecular(0.39,0.27,0.17);
    sphere.material.nPhongs(25.6);
    sphere.scale(0.35,0.35,0.35);

    let sphere2 = scene.addObject(sphere_model.gl_model);
    sphere2.positionAt(0.55,-0.65,-0.5);
    sphere2.material.kAmbient(0.21,0.13,0.05);
    sphere2.material.kDiffuse(0.71,0.43,0.18);    
    sphere2.material.kSpecular(0.39,0.27,0.17);
    sphere2.material.nPhongs(25.6);
    sphere2.scale(0.35,0.35,0.35);

    let sphere3 = scene.addObject(sphere_model.gl_model);
    sphere3.positionAt(-0.10,-0.65, 0.05);
    sphere3.material.kAmbient(0.21,0.13,0.05);
    sphere3.material.kDiffuse(0.71,0.43,0.18);    
    sphere3.material.kSpecular(0.39,0.27,0.17);
    sphere3.material.nPhongs(25.6);
    sphere3.scale(0.35,0.35,0.35);

    return scene;
}

function initScene1( name , gl , shaderProgram){
    let scene = new Scene(name, gl, shaderProgram);
    
    scene.addModel(floor_model);

    let floor = scene.addObject(floor_model.gl_model);
    floor.material.kAmbient(0,0,0);    
    floor.material.kDiffuse(1,1,1);
    floor.scale(5,1,5)

    return scene;
}

function populateRightScene(sr)
{
    // Add light to right scene
    let light_source = new LightSource();
    light_source.positionAt(0,0,0.5);
    light_source.type(0); // 1 -> omni , 0 -> directional
    light_source.switchOn();
    sr.addLightSource(light_source);

    // Add camera into right scene
    let camera = new Camera();
    camera.radius = 4;
    camera.lookAt(0,0,0);
    sr.addCamera(camera);

    // Perspective parameters for right scene
    sr.fieldofview = 35;
    sr.far = 10;
    sr.near = 1;

    return sr
}

function populateLeftScene(sl)
{
    // Add light to left scene
    let light_source = new LightSource();
    light_source.positionAt(0,0.2,1.30);
    light_source.type(0); // 1 -> omni , 0 -> directional
    light_source.switchOn();
    sl.addLightSource(light_source);

    // Add camera to left scene
    let camera = new Camera();
    //camera.rotate(10,40,0);
    //camera.positionAt(0,0,10);
    camera.lookAt(0,0,0);
    camera.radius = 6;
    sl.addCamera(camera);

    // Perspective parameters for left scene
    sl.fieldofview = 85;
    sl.far = 20;
    sl.near = 1;

    // View Volume representing right scene view volume
    sl.addModel(frustum_model);
    viewVolume = sl.addObject(frustum_model.gl_model);
    viewVolume.material.kAmbient(0.21,0.13,0.05);
    viewVolume.material.kDiffuse(0.71,0.43,0.18);
    viewVolume.material.kSpecular(0.39,0.27,0.17);
    viewVolume.material.nPhongs(25.6);

    return sl
}

function initModels()
{
    cube_model = Model.getCubeModel();
    pyramid_model = Model.getPyramidModel();
    floor_model = Model.getFloorModel();
    bck_model = Model.getBackgroundModel();
    sphere_model = Model.getSphereModel();
    frustum_model = Model.getVolumeModel();
}



//----------------------------------------------------------------------------

function runWebGL() {
    var canvasl = document.getElementById("canvasl");
    var canvasr = document.getElementById("canvasr");

    initScenes(canvasl, canvasr);

    setEventListeners();

    tick();
}



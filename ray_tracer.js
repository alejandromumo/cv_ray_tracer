//----------------------------------------------------------------------------
// Global Variables

var gll = null; // WebGL context
var glr = null;
var viewVolume = null;
var modePick = true;

var currScene = 3;
var currObjectl = null;
var currObjectr = null;

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
var projectionType = 1;

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


//----------------------------------------------------------------------------

// Timer

function tick() {
    requestAnimFrame(tick);
    scener.drawScene(projectionType, primitiveType, null);
    scenel.drawScene(projectionType, primitiveType, scener);
}

//----------------------------------------------------------------------------
function loadScene3(){
    if(currScene == 3) return;
    setOutputColors([2.55,2.55,2.55],[2.55,2.55,2.55],[2.55,2.55,2.55]);
    currScene = 3
    currObjectl = scenel3.objects[2]
    currObjectr = scener3.objects[1]
    scener3.initBuffers()
    scenel3.initBuffers()
    scener = scener3
    scenel = scenel3
}

function loadScene2(){
    if(currScene == 2) return;
    setOutputColors([2.55,2.55,2.55],[2.55,2.55,2.55],[2.55,2.55,2.55]);
    currScene = 2
    currObjectl = scenel2.objects[2]
    currObjectr = scener2.objects[1]
    scener2.initBuffers()
    scenel2.initBuffers()
    scener = scener2
    scenel = scenel2
}

function loadScene1(){
    if(currScene == 1) return;
    setOutputColors([2.55,2.55,2.55],[2.55,2.55,2.55],[2.55,2.55,2.55]);    
    currScene = 1
    currObjectl = null
    currObjectr = null
    scener1.initBuffers()
    scenel1.initBuffers()
    scener = scener1
    scenel = scenel1
}

function updateObj(){
    if (currObjectl== null) return;

    let objx = document.getElementById('x_obj').value;
    let objy = document.getElementById('y_obj').value;
    let objz = document.getElementById('z_obj').value;

    currObjectl.positionAt(objx,objy, objz);
    currObjectr.positionAt(objx,objy, objz);
}

function changeMode(){
    modePick = !modePick
}

function addSphereToScene(){
    if(currScene == 1)
    {
        var sphere_model_tmp = null;
        for(let I = 0;I < scener.models.length; I++)
        {
            if(scener.models[I].name == "sphere")
            {
                sphere_model_tmp = scener.models[I];
                break;
            }
        }

        var spherer = scener.addObject(sphere_model_tmp.gl_model);
        var spherel = scenel.addObject(sphere_model_tmp.gl_model);
        spherer.scale(0.35,0.35,0.35);
        spherel.scale(0.35,0.35,0.35);
        spherer.positionAt(0,1,0);
        spherel.positionAt(0,1,0);
        spherer.material.kAmbient(0.00,0.00,0.05);
        spherer.material.kDiffuse(0.00,0.00,1.00);    
        spherer.material.kSpecular(1.00,1.00,1.00);
        spherer.material.nPhongs(125.0);

        spherel.material.kAmbient(0.00,0.00,0.05);
        spherel.material.kDiffuse(0.00,0.00,1.00);    
        spherel.material.kSpecular(1.00,1.00,1.00);
        spherel.material.nPhongs(125.0);

    }
    else if(currScene == 2)
    {
        var sphere_model_tmp = null;
        for(let I = 0;I < scener.models.length; I++)
        {
            if(scener.models[I].name == "sphere")
            {
                sphere_model_tmp = scener.models[I];
                break;
            }
        }

        if(sphere_model_tmp == null)
        {
            sphere_model_tmp = Model.getSphereModel();
            scener.addModel(sphere_model_tmp);
            scenel.addModel(sphere_model_tmp);
        }

        var spherer = scener.addObject(sphere_model_tmp.gl_model);
        var spherel = scenel.addObject(sphere_model_tmp.gl_model);
        spherer.scale(0.35,0.35,0.35);
        spherel.scale(0.35,0.35,0.35);
        spherer.positionAt(0,0,0);
        spherel.positionAt(0,0,0);
        spherer.material.kAmbient(0.00,0.00,0.05);
        spherer.material.kDiffuse(0.00,0.00,1.00);    
        spherer.material.kSpecular(1.00,1.00,1.00);
        spherer.material.nPhongs(125.0);

        spherel.material.kAmbient(0.00,0.00,0.05);
        spherel.material.kDiffuse(0.00,0.00,1.00);    
        spherel.material.kSpecular(1.00,1.00,1.00);
        spherel.material.nPhongs(125.0);
    }
    else if(currScene == 3)
    {
        var sphere_model_tmp = null;
        for(let I = 0;I < scener.models.length; I++)
        {
            if(scener.models[I].name == "sphere")
            {
                sphere_model_tmp = scener.models[I];
                break;
            }
        }

        if(sphere_model_tmp == null)
        {
            sphere_model_tmp = Model.getSphereModel();
            scener.addModel(sphere_model_tmp);
            scenel.addModel(sphere_model_tmp);
        }

        var spherer = scener.addObject(sphere_model_tmp.gl_model);
        var spherel = scenel.addObject(sphere_model_tmp.gl_model);
        spherer.scale(0.35,0.35,0.35);
        spherel.scale(0.35,0.35,0.35);
        spherer.positionAt(0,1,0);
        spherel.positionAt(0,1,0);
        spherer.material.kAmbient(0.00,0.00,0.05);
        spherer.material.kDiffuse(0.00,0.00,1.00);    
        spherer.material.kSpecular(1.00,1.00,1.00);
        spherer.material.nPhongs(125.0);

        spherel.material.kAmbient(0.00,0.00,0.05);
        spherel.material.kDiffuse(0.00,0.00,1.00);    
        spherel.material.kSpecular(1.00,1.00,1.00);
        spherel.material.nPhongs(125.0);
    }
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
            case 107: // zoom in
                console.log(scenel.camera.toString());
                scenel.camera.translate(0, -1, 0);
                console.log("Zoom in");
                break;
            case 109: // zoom out
                console.log(scenel.camera.toString());
                scenel.camera.translate(0, 1, 0);
                console.log("Zoom out");
                break;
            case 13:
                console.log("Scene right: ");
                console.log(scener);
                console.log("Scene left: ");
                console.log(scenel);
                break;
            default:
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
        ray.origin_object = scener.camera;

        if(modePick){
            let id = get_first_intersection(ray, pick=true)
            if (id==null) return;
            currObjectr = scener.objects[id];
            currObjectl = scenel.objects[id+1];
        }else{
            rayCast(ray,2);
        }
            }, false);
}

// Calculate nearest intersection of a ray
function get_first_intersection(ray, pick=false)
{
        var objId = null;
        var nearest = vec3()
        var dnearest = Infinity;
        var distance;
        var normal = vec3()
        var point = vec3()
        var sphere_center = vec3();
        var nearest_normal = vec3();
        var tmp = null;
        var found = false;
        var dest_object = null;
        // Calculate nearest intersection
        for(var i = 0 ; i < scener.objects.length ; i++){
            if( scener.objects[i].glmodel.model.name === "sphere" ){
                
                tmp = Ray.testSphereIntersectionSphere(ray, scener.objects[i]);
                // The Ray does not intersect this object
                if (tmp == null ){
                    continue;
                }
                point = tmp[0];
                sphere_center = tmp[1];
                scener.objects[i].center = sphere_center;
                ray.dest_object = scener.objects[i];

                distance =  distanceBetween2Points(scener.camera.cameraPosition, point)
                if (distance < dnearest){
                    objId = i;
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
            return null;
        }
        if(pick){
            return objId;
        }


        return [nearest,nearest_normal];
}

// Recursive function to draw initial ray and reflections
function rayCast(ray, depth)
{
    var tmp = get_first_intersection(ray);
    if(tmp == null && depth == 3)
    {
        trace_ray(ray.origin, ray.dest);
    }

    if(ray == null || depth == 0 || tmp == null)
    {
        // trace_ray(ray.origin, scener.light_sources[0].position);
        return;
    }
    // compute nearest intersection of a given ray
    var nearest = tmp[0];
    var nearest_normal = tmp[1];

    // draw the given ray
    trace_ray(ray.origin, nearest);
    // compute vertex colors
    if(ray.origin_object.glmodel != null)
        computeColors(ray);
    // compute the reflection of given ray into the nearest point
    rayCast(get_reflected_ray(ray, nearest, nearest_normal), depth - 1);
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

    reflected_ray.origin_object = origin_ray.dest_object;
    return reflected_ray;
}

// Draw a ray
function trace_ray(origin, dest)
{
    var ray = new Ray(  origin[0],origin[1],origin[2],
                        dest[0],dest[1],dest[2]);
    var distance = distanceBetween2Points(origin, dest);
    ray.size = distance;
    ray.drawRay(scenel,
                origin[0],origin[1],origin[2]);
}

// compute origin and dest vertex colors
function computeColors(ray)
{
    var origin_vertex = ray.origin;
    var origin_vertex_color = getColor(ray.origin_object, origin_vertex);
    var dest_vertex = ray.dest;
    var dest_vertex_color = getColor(ray.dest_object, dest_vertex);
    var new_color = vec3();
    var reflection_index = 0.6;
    new_color[0] = (reflection_index * dest_vertex_color[0])
    + ((1 - reflection_index) * origin_vertex_color[0]) ;
    new_color[1] = (reflection_index * dest_vertex_color[1])
    + ((1 - reflection_index) * origin_vertex_color[1]) ;
    new_color[2] = (reflection_index * dest_vertex_color[2])
    + ((1 - reflection_index) * origin_vertex_color[2]) ;

    setOutputColors(origin_vertex_color, dest_vertex_color, new_color);
}

function setOutputColors(origin_vertex_color, dest_vertex_color, new_color)
{
    document.getElementById("Ocolor")
    .style
    .fill = 'rgb(' 
    + origin_vertex_color[0]*100 + ', ' 
    + origin_vertex_color[1]*100 + ' , ' 
    + origin_vertex_color[2]*100 + ')';

    document.getElementById("Dcolor")
    .style
    .fill = 'rgb(' 
    + dest_vertex_color[0]*100 + ', ' 
    + dest_vertex_color[1]*100 + ' , ' 
    + dest_vertex_color[2]*100 + ')';

    document.getElementById("Ncolor")
    .style
    .fill = 'rgb(' 
    + new_color[0]*100 + ', ' 
    + new_color[1]*100 + ' , ' 
    + new_color[2]*100 + ')';
}


// Computes color of a vertex using phong model
function getColor(object, vertex)
{
    var color = vec3();

    var ambientTerm = object.material.kAmbi;
    
    var diffuseTerm = object.material.kDiff;
    
    var specularTerm = object.material.kSpec;

    var L = vec3();
    var E = vec3();

    if(scener.light_sources[0].position[3] == 0)
    {
        L[0] = scener.light_sources[0].position[0];
        L[1] = scener.light_sources[0].position[1];
        L[2] = scener.light_sources[0].position[2];
        normalize(L);
    }
    else
    {
        L = subtract([scener.light_sources[0].position[0],
                    scener.light_sources[0].position[1],
                    scener.light_sources[0].position[2]]
                    ,vertex);
        normalize(L)
    }

    E = normalized(vertex);
    E[0] = - E[0];
    E[1] = - E[1];
    E[2] = - E[2];

    var H  = vec3();
    H = add(L,E);
    normalize(H);

    var N = vec4();
    N = subtract(vertex, object.center);
    normalize(N)

    // ambient
    var ambient = vec4(ambientTerm[0],ambientTerm[1],ambientTerm[2],1);
    // diffuse
    var dotProductLN = dotProduct(L,N);

    var cosNL = Math.max(dotProductLN, 0.0);
    var diffuse = vec4(diffuseTerm[0] * cosNL,
                    diffuseTerm[1] * cosNL,
                    diffuseTerm[2] * cosNL,
                    1.0); 
    // specular
    var dotProductNH = dotProduct(N,H);
    
    var cosNH = Math.pow(Math.max(dotProductNH, 0.0), object.material.nPhong);
    var specular = vec4(specularTerm[0] * cosNH,
                    specularTerm[1] * cosNH,
                    specularTerm[2] * cosNH,
                    1.0); 

    if( dotProductLN < 0.0 ) 
    {
        specular = vec4(0.0, 0.0, 0.0, 1.0);
    }

    color[0] = ambient[0] + diffuse[0] + specular[0];
    color[1] = ambient[1] + diffuse[1] + specular[1];
    color[2] = ambient[2] + diffuse[2] + specular[2];
    return color;
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
    scenel1 = initScene1("left-scene1", gll, shaderProgramLeft, true);
    scener1 = populateRightScene(scener1);
    scenel1 = populateLeftScene(scenel1);

    scener2 = initScene2("right-scene2", glr, shaderProgramRight);
    scenel2 = initScene2("left-scene2", gll, shaderProgramLeft, true);
    scener2 = populateRightScene(scener2);
    scenel2 = populateLeftScene(scenel2);
    
    scener3 = initScene3("right-scene3", glr, shaderProgramRight);
    scenel3 = initScene3("left-scene3", gll, shaderProgramLeft, true);
    scener3 = populateRightScene(scener3);
    scenel3 = populateLeftScene(scenel3);
    
    scener3.initBuffers()
    scenel3.initBuffers()

    currObjectl = scenel3.objects[1]
    currObjectr = scener3.objects[0]

    scener = scener3
    scenel = scenel3

    
}

function initScene3( name , gl , shaderProgram, frustrum = false){
    let scene = new Scene(name, gl, shaderProgram);

    var floor_model_tmp = Model.getFloorModel();
    var bck_model_tmp = Model.getBackgroundModel();
    var sphere_model_tmp = Model.getSphereModel();

    scene.addModel(floor_model_tmp);
    scene.addModel(bck_model_tmp);
    scene.addModel(sphere_model_tmp);

    if(frustrum){
        // View Volume representing right scene view volume
        scene.addModel(frustum_model);
        let viewVolume = scene.addObject(frustum_model.gl_model);
        viewVolume.material.kAmbient(0.21,0.13,0.05);
        viewVolume.material.kDiffuse(0.71,0.43,0.18);
        viewVolume.material.kSpecular(0.39,0.27,0.17);
        viewVolume.material.nPhongs(25.6);
    }

    let floor = scene.addObject(floor_model_tmp.gl_model);
    floor.material.kDiffuse(1,1,1);

    let background = scene.addObject(bck_model_tmp.gl_model);
    background.material.kAmbient(0.21,0.13,0.05);
    background.material.kDiffuse(0.71,0.43,0.18);
    background.material.kSpecular(0.39,0.27,0.17);
    background.material.nPhongs(25.6);
    background.positionAt(0,0,0);

    let leftwall = scene.addObject(bck_model_tmp.gl_model);
    leftwall.material.kAmbient(0.21,0.13,0.05);
    leftwall.material.kDiffuse(0.71,0.43,0.18);
    leftwall.material.kSpecular(0.39,0.27,0.17);
    leftwall.material.nPhongs(25.6);
    leftwall.rotate(0,90,0)
    leftwall.positionAt(0,0,0);

    let rightwall = scene.addObject(bck_model_tmp.gl_model);
    rightwall.material.kAmbient(0.21,0.13,0.05);
    rightwall.material.kDiffuse(0.71,0.43,0.18);
    rightwall.material.kSpecular(0.39,0.27,0.17);
    rightwall.material.nPhongs(25.6);
    rightwall.rotate(0,270,0)
    rightwall.positionAt(0,0,0);

    let sphere = scene.addObject(sphere_model_tmp.gl_model);
    sphere.positionAt(0.55,-0.65,0.55);
    sphere.material.kAmbient(0.21,0.13,0.05);
    sphere.material.kDiffuse(0.71,0.43,0.18);    
    sphere.material.kSpecular(0.39,0.27,0.17);
    sphere.material.nPhongs(25.6);
    sphere.scale(0.35,0.35,0.35);

    let sphere2 = scene.addObject(sphere_model_tmp.gl_model);
    sphere2.positionAt(0.55,-0.65,-0.5);
    sphere2.material.kAmbient(0.30,0.00,0.00);
    sphere2.material.kDiffuse(0.60,0.00,0.00);    
    sphere2.material.kSpecular(0.80,0.60,0.60);
    sphere2.material.nPhongs(32.0);
    sphere2.scale(0.35,0.35,0.35);

    let sphere3 = scene.addObject(sphere_model_tmp.gl_model);
    sphere3.positionAt(-0.10,-0.65, 0.05);
    sphere3.material.kAmbient(0.00,0.00,0.05);
    sphere3.material.kDiffuse(0.00,0.00,1.00);    
    sphere3.material.kSpecular(1.00,1.00,1.00);
    sphere3.material.nPhongs(125.0);
    sphere3.scale(0.35,0.35,0.35);

    return scene;
}

function initScene2( name , gl , shaderProgram,  frustrum = false){
    let scene = new Scene(name, gl, shaderProgram);

    var floor_model_tmp = Model.getFloorModel();
    var sphere_model_tmp = Model.getSphereModel();

    scene.addModel(floor_model_tmp);
    scene.addModel(sphere_model_tmp);

    if(frustrum){
        // View Volume representing right scene view volume
        scene.addModel(frustum_model);
        let viewVolume = scene.addObject(frustum_model.gl_model);
        viewVolume.material.kAmbient(0.21,0.13,0.05);
        viewVolume.material.kDiffuse(0.71,0.43,0.18);
        viewVolume.material.kSpecular(0.39,0.27,0.17);
        viewVolume.material.nPhongs(25.6);
    }

    let floor = scene.addObject(floor_model_tmp.gl_model);
    floor.material.kAmbient(0,1,0);    
    floor.material.kDiffuse(1,1,1);
    floor.scale(5,1,5)

    let sphere = scene.addObject(sphere_model_tmp.gl_model);
    sphere.positionAt(0.50,0.40,0.50);
    sphere.material.kAmbient(0.21,0.13,0.05);
    sphere.material.kDiffuse(0.71,0.43,0.18);    
    sphere.material.kSpecular(0.39,0.27,0.17);
    sphere.material.nPhongs(25.6);
    sphere.scale(0.35,0.35,0.35);

    let sphere2 = scene.addObject(sphere_model_tmp.gl_model);
    sphere2.positionAt(0.50,-0.40,0.50);
    sphere2.material.kAmbient(0.21,0.13,0.05);
    sphere2.material.kDiffuse(0.71,0.43,0.18);    
    sphere2.material.kSpecular(0.39,0.27,0.17);
    sphere2.material.nPhongs(25.6);
    sphere2.scale(0.35,0.35,0.35);

    let sphere3 = scene.addObject(sphere_model_tmp.gl_model);
    sphere3.positionAt(-0.50,-0.40, 0.50);
    sphere3.material.kAmbient(0.00,0.00,0.50);
    sphere3.material.kDiffuse(0.00,0.00,1.00);    
    sphere3.material.kSpecular(1.00,1.00,1.00);
    sphere3.material.nPhongs(125.0);
    sphere3.scale(0.35,0.35,0.35);

    let sphere4 = scene.addObject(sphere_model_tmp.gl_model);
    sphere4.positionAt(-0.50,0.40, 0.50);
    sphere4.material.kAmbient(0.23,0.23,0.23);
    sphere4.material.kDiffuse(0.28,0.28,0.28);    
    sphere4.material.kSpecular(0.77,0.77,0.77);
    sphere4.material.nPhongs(89.6);
    sphere4.scale(0.35,0.35,0.35);

    return scene;
}

function initScene1( name , gl , shaderProgram, frustrum = false){
    let scene = new Scene(name, gl, shaderProgram);
    
    var floor_model_tmp = Model.getFloorModel();
    var sphere_model_tmp = Model.getSphereModel();

    scene.addModel(floor_model_tmp);
    scene.addModel(sphere_model_tmp);

    if(frustrum){
        // View Volume representing right scene view volume
        scene.addModel(frustum_model);
        let viewVolume = scene.addObject(frustum_model.gl_model);
        viewVolume.material.kAmbient(0.21,0.13,0.05);
        viewVolume.material.kDiffuse(0.71,0.43,0.18);
        viewVolume.material.kSpecular(0.39,0.27,0.17);
        viewVolume.material.nPhongs(25.6);
    }

    let floor = scene.addObject(floor_model_tmp.gl_model);
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
    light_source.type(1); // 1 -> omni , 0 -> directional
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

function reset_both_scenes_rays()
{
    reset_rays(scenel);
    setOutputColors([2.55,2.55,2.55],[2.55,2.55,2.55],[2.55,2.55,2.55]);
}

function disable_frustum()
{
    scenel.drawFrustum  = !scenel.drawFrustum;
}

function reset_rays(scene)
{
    for(let I = scene.objects.length - 1 ; I >= 0; I--)
    {
        if(scene.objects[I].glmodel.model.name == "ray")
        {
            scene.objects.splice(I,1);
        }
    }
}

function populateLeftScene(sl)
{
    // Add light to left scene
    let light_source = new LightSource();
    light_source.positionAt(0,0.2,1);
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



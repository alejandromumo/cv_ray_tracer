//----------------------------------------------------------------------------
//
// Global Variables
//

var gl = null; // WebGL context

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
//
// The WebGL code
//

// Animation --- Updating transformation parameters

var lastTime = 0;

function animate() {
	
	var timeNow = new Date().getTime();
	
	if( lastTime != 0 ) {
		
		var elapsed = timeNow - lastTime;
		
		// Global rotation
		
		if( globalRotationYY_ON ) {

			globalAngleYY += globalRotationYY_DIR * globalRotationYY_SPEED * (90 * elapsed) / 1000.0;
	    }

		// Local rotations
		
		if( rotationXX_ON ) {

			angleXX += rotationXX_DIR * rotationXX_SPEED * (90 * elapsed) / 1000.0;
	    }

		if( rotationYY_ON ) {

			angleYY += rotationYY_DIR * rotationYY_SPEED * (90 * elapsed) / 1000.0;
	    }

		if( rotationZZ_ON ) {

			angleZZ += rotationZZ_DIR * rotationZZ_SPEED * (90 * elapsed) / 1000.0;
	    }
	}
	
	lastTime = timeNow;
}


//----------------------------------------------------------------------------

// Timer

function tick() {

	requestAnimFrame(tick);
	animate();

	var scene = new Scene("scene1");
	var cube_model = Model.getCubeModel();
	var pyramid_model = Model.getPyramidModel();
	var floor_model = Model.getFloorModel();
	var bck_model = Model.getBackgroundModel();
	scene.addModel(cube_model);
	scene.addModel(pyramid_model);
	scene.addModel(floor_model);
	scene.addModel(bck_model);

	var cube = scene.addObject(cube_model.gl_model);
	cube.rotate(angleXX, 0, 0);
	cube.translate(0, 0.4, 0);


	var pyramid = scene.addObject(pyramid_model.gl_model);
	pyramid.rotate(0, angleYY, angleZZ);
	pyramid.translate(0.4, -0.5, 0);

	var floor = scene.addObject(floor_model.gl_model);

	var background = scene.addObject(bck_model.gl_model);

	scene.drawScene(projectionType, primitiveType);
}

//
//  User Interaction
//

function outputInfos(){
}

//----------------------------------------------------------------------------

function setEventListeners(){

	// File loading
	
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
//
// WebGL Initialization
//

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
		
		gl.enable( gl.CULL_FACE );
		
		// DEFAULT: The BACK FACE is culled!!
		
		// The next instruction is not needed...
		
		gl.cullFace( gl.BACK );

		// Enable DEPTH-TEST
		
		gl.enable( gl.DEPTH_TEST );
		        
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry! :-(");
	}        
}

//----------------------------------------------------------------------------

function runWebGL() {
	
	var canvas = document.getElementById("my-canvas");
	
	initWebGL( canvas );

	shaderProgram = initShaders( gl );
	
	setEventListeners();

	tick();		  

	outputInfos();
}



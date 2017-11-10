class Model{
	constructor(name)
	{
		this.name = name;
		this.positionArray = [];
		this.colorArray = [];
		this.normalsArray = [];
		this.gl_model = null;
	}
	
	static getCubeModel()
	{
		var cube = new Model("cube");
		cube.positionArray = [
		// FRONT FACE
		-0.25, -0.25,  0.25,
		 
		 0.25, -0.25,  0.25,
		 
		 0.25,  0.25,  0.25,

		 
		 0.25,  0.25,  0.25,
		 
		-0.25,  0.25,  0.25,
		 
		-0.25, -0.25,  0.25,
		
		// TOP FACE
		
		-0.25,  0.25,  0.25,
		 
		 0.25,  0.25,  0.25,
		 
		 0.25,  0.25, -0.25,

		 
		 0.25,  0.25, -0.25,
		 
		-0.25,  0.25, -0.25,
		 
		-0.25,  0.25,  0.25,
		
		// BOTTOM FACE 
		
		-0.25, -0.25, -0.25,
		 
		 0.25, -0.25, -0.25,
		 
		 0.25, -0.25,  0.25,

		 
		 0.25, -0.25,  0.25,
		 
		-0.25, -0.25,  0.25,
		 
		-0.25, -0.25, -0.25,
		
		// LEFT FACE 
		
		-0.25,  0.25,  0.25,
		 
		-0.25, -0.25, -0.25,

		-0.25, -0.25,  0.25,
		 
		 
		-0.25,  0.25,  0.25,
		 
		-0.25,  0.25, -0.25,
		 
		-0.25, -0.25, -0.25,
		
		// RIGHT FACE 
		
		 0.25,  0.25, -0.25,
		 
		 0.25, -0.25,  0.25,

		 0.25, -0.25, -0.25,
		 
		 
		 0.25,  0.25, -0.25,
		 
		 0.25,  0.25,  0.25,
		 
		 0.25, -0.25,  0.25,
		
		// BACK FACE 
		
		-0.25,  0.25, -0.25,
		 
		 0.25, -0.25, -0.25,

		-0.25, -0.25, -0.25,
		 
		 
		-0.25,  0.25, -0.25,
		 
		 0.25,  0.25, -0.25,
		 
		 0.25, -0.25, -0.25,			 
		];

		cube.colorArray = [

		 // FRONT FACE
		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,

		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 			 
		 // TOP FACE
		 	
		 0.00,  0.00,  0.00,
		 
		 0.00,  0.00,  0.00,
		 
		 0.00,  0.00,  0.00,

		 	
		 0.00,  0.00,  0.00,
		 
		 0.00,  0.00,  0.00,
		 
		 0.00,  0.00,  0.00,
		 			 
		 // BOTTOM FACE
		 	
		 0.00,  1.00,  0.00,
		 
		 0.00,  1.00,  0.00,
		 
		 0.00,  1.00,  0.00,

		 	
		 0.00,  1.00,  0.00,
		 
		 0.00,  1.00,  0.00,
		 
		 0.00,  1.00,  0.00,
		 			 
		 // LEFT FACE
		 	
		 0.00,  0.00,  1.00,
		 
		 0.00,  0.00,  1.00,
		 
		 0.00,  0.00,  1.00,

		 	
		 0.00,  0.00,  1.00,
		 
		 0.00,  0.00,  1.00,
		 
		 0.00,  0.00,  1.00,
		 			 
		 // RIGHT FACE
		 	
		 0.25,  0.50,  0.50,
		 
		 0.25,  0.50,  0.50,
		 
		 0.25,  0.50,  0.50,

		 	
		 0.25,  0.50,  0.50,
		 
		 0.25,  0.50,  0.50,
		 
		 0.25,  0.50,  0.50,
		 			 
		 			 
		 // BACK FACE
		 	
		 0.25,  0.00,  0.75,
		 
		 0.25,  0.00,  0.75,
		 
		 0.25,  0.00,  0.75,

		 	
		 0.25,  0.00,  0.75,
		 
		 0.25,  0.00,  0.75,
		 
		 0.25,  0.00,  0.75,			 			 
		];

		computeVertexNormals(cube.positionArray, cube.normalsArray);
		return cube;
	}

	static getPyramidModel()
	{
		var pyramid = new Model("pyramid");
		pyramid.positionArray = [
			// Base
			0.00 , 0.00 , 0.25, //v0
			
			0.00 , 0.00 , 0.00, //v3
			
			0.25 , 0.00 , 0.25, //v1

			0.25 , 0.00 , 0.25, //v1

			0.00 , 0.00 , 0.00, //v3

			0.25 , 0.00 , 0.00, //v2

			// Left side
			0.00 , 0.00 , 0.25, //v0

			0.125, 0.50 , 0.125,//h

			0.00 , 0.00 , 0.00, //v3

			// Right side
			0.25 , 0.00 , 0.00, //v2

			0.125, 0.50 , 0.125,//h

			0.25 , 0.00 , 0.25, //v1

			// Front side
			0.25 , 0.00 , 0.25, //v1

			0.125, 0.50 , 0.125,//h

			0.00 , 0.00 , 0.25, //v0
			
			// Back side
			0.00 , 0.00 , 0.00, //v3

			0.125, 0.50 , 0.125,//h
			
			0.25 , 0.00 , 0.00, //v2
			];

		pyramid.colorArray = [
			// Base
			1.00, 0.00, 0.00,

			1.00, 0.00, 0.00,

			1.00, 0.00, 0.00,

			1.00, 0.00, 0.00,

			1.00, 0.00, 0.00,

			1.00, 0.00, 0.00,

			// Left side
			0.00, 1.00, 0.00,

			0.00, 1.00, 0.00,

			0.00, 1.00, 0.00,

			// Right side
			0.00, 0.00, 1.00,

			0.00, 0.00, 1.00,

			0.00, 0.00, 1.00,
			// Front side
			1.00, 0.00, 1.00,

			1.00, 0.00, 1.00,

			1.00, 0.00, 1.00,
			// Back side
			0.00, 1.00, 1.00,

			0.00, 1.00, 1.00,

			0.00, 1.00, 1.00,
			];
			computeVertexNormals(pyramid.positionArray, pyramid.normalsArray)
			return pyramid;
	}

	static getFloorModel()
	{
		var floor = new Model("floor");
		floor.positionArray = [
		 1.00 , 0.00, 1.00,
		 
		-1.00 , 0.00, 1.00,

		-1.00 , 0.00, -1.00,


		 1.00, 0.00,  1.00,
		
		-1.00, 0.00, -1.00,


		 1.00, 0.00, -1.00 
		];

		floor.colorArray = [
		0.25, 0.20, 0,

		0.25, 0.20, 0,

		0.25, 0.20, 0,

		0.25, 0.20, 0,

		0.25, 0.20, 0,

		0.25, 0.20, 0
		];
		computeVertexNormals(floor.positionArray, floor.normalsArray)
		return floor;
	}

	static getBackgroundModel()
	{
		var background = new Model("background");
		background.positionArray = [
		1.00 , 0.00, -1.00,

		1.00 , 1.00, -1.00,

		-1.00 , 1.00, -1.00,

		 1.00, 0.00, -1.00,

		-1.00, 1.00, -1.00,

		-1.00, 0.00, -1.00 
		];

		background.colorArray = [
		0.30, 0.30, 0.30,

		0.30, 0.30, 0.30,

		0.30, 0.30, 0.30,

		0.30, 0.30, 0.30,

		0.30, 0.30, 0.30,

		0.30, 0.30, 0.30,
		];
		computeVertexNormals(background.positionArray, background.normalsArray)
		return background;
	}

	static getSphereModel()
	{
		var sphere = new Model("sphere");
		sphere.positionArray = []; 	// TODO
		sphere.colorArray = []; 	// TODO
	}

	// TODO Get Model from OBJ Files

	static getFromFile(file)
	{	
		var file_model = new Model(file.name);
		return file_model;
	}
}
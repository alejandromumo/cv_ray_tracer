class Scene{

	constructor(name, gl_context, sp)
	{
		this.name = name;
		this.models = [];
		this.objects = [];
		this.light_sources = []; // TODO
		this.camera = null; 	 // TODO
		this.pMatrix = mat4();

		this.gl = gl_context;	// Confirm
		this.shaderProgram = sp;// Confirm
		
		this.next_model_index = 0;
		this.model_vertices = [];
		this.model_colors = [];
		this.textures = [];
		this.normals = [];
		this.dict = {};
	}

	drawScene(projectionType, primitiveType)
	{
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
			
		// Computing the Projection Matrix	
		this.computeProjectionMatrix(projectionType);

		this.objects.forEach(function(myObject)
		{
			initBuffers();
			myObject.drawObject(primitiveType);
		});
	}

	computeProjectionMatrix(projectionType)
	{
		if( projectionType == 0 ) {
			
			this.pMatrix = ortho( -1.0, 1.0, -1.0, 1.0, -1.0, 1.0 );
			
			this.camera = 0;
		}
		else {	
			
			this.pMatrix = perspective( 45, 1, 0.05, 15 );
			
			this.camera = -2.5;
		}

		var pUniform = this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
		
		this.gl.uniformMatrix4fv(pUniform, false,
							 new Float32Array(flatten(this.pMatrix)));
	}

	addCubeModel()
	{
		var model = Model.getCubeModel();

		var tmp_gl = new GLModel(model, this.next_model_index);
		model.gl_model = tmp_gl;

		this.next_model_index += tmp_gl.size;
		this.models.push(model);
		this.model_vertices = this.model_vertices.concat(model.positionArray);
		this.model_colors = this.model_colors.concat(model.colorArray);
		this.dict["cube"] = tmp_gl;
	}

	addCube(myObjectCube)
	{	
		myObjectCube.glmodel = this.dict["cube"];
		this.objects.push(myObjectCube);
	}
}
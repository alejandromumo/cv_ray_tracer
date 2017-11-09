class Scene{

	constructor(name)
	{
		this.name = name;

		this.objects = [];
		this.light_sources = []; // TODO
		this.models = [];

		this.camera = null; 	 // TODO
		this.pMatrix = mat4();
		
		this.next_model_index = 0;
		this.model_vertices = [];
		this.model_colors = [];
	}

	drawScene(projectionType, primitiveType)
	{
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			
		// Computing the Projection Matrix	
		this.computeProjectionMatrix(projectionType);

		this.objects.forEach(function(myObject)
		{
			myObject.drawObject(primitiveType);
		});
	}

	computeProjectionMatrix(projectionType)
	{
		if( projectionType == 0 ) {
			
			this.pMatrix = ortho( -1.0, 1.0, -1.0, 1.0, -1.0, 1.0 );
			
			globalTz = 0;
		}
		else {	
			
			this.pMatrix = perspective( 45, 1, 0.05, 15 );
			
			globalTz = -3.5;
		}

		var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
		
		gl.uniformMatrix4fv(pUniform, false,
							 new Float32Array(flatten(this.pMatrix)));
	}

	addModel(model)
	{
		this.models.push(model);
		var gl_model = new GLModel(model, this.next_model_index);
		model.gl_model = gl_model;
		
		this.model_vertices = this.model_vertices.concat(model.positionArray);
		this.model_colors = this.model_colors.concat(model.colorArray);
		this.initBuffers();

		this.next_model_index += gl_model.size;
	}

	addObject(gl_model)
	{
		var newObject = new myObject(gl_model);
		this.objects.push(newObject);
		return newObject;
	}

	initBuffers() {	
	
	// Coordinates
		
	triangleVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.model_vertices), gl.STATIC_DRAW);
	triangleVertexPositionBuffer.itemSize = 3;
	triangleVertexPositionBuffer.numItems = this.model_vertices.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
			triangleVertexPositionBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
	
	// Colors
		
	triangleVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.model_colors), gl.STATIC_DRAW);
	triangleVertexColorBuffer.itemSize = 3;
	triangleVertexColorBuffer.numItems = this.model_colors.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 
			triangleVertexColorBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
}
}
class Scene{

    constructor(name)
    {
        this.name = name;

        this.objects = [];
        this.light_sources = [];
        this.models = [];

        this.camera = null;
        this.pMatrix = mat4();

        this.next_model_index = 0;
        this.model_vertices = [];
        this.normals = [];
        this.viewerPosition = [0,0,0,0];
    }

    drawScene(projectionType, primitiveType)
    {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Computing the Projection Matrix
        this.computeProjectionMatrix(projectionType);
        this.computeViewerPosition();
        var l = this.light_sources[0];
        this.objects.forEach(function(myObject)
        {
            if(l.isOn)
            	myObject.computeLight(l);
            myObject.drawObject(primitiveType);
        });
    }

    computeProjectionMatrix(projectionType)
    {
        this.camera.computeCameraMatrix();
        this.camera.computeViewMatrix();

        if( projectionType == 0 ) {
            this.pMatrix = ortho( -1.0, 1.0, -1.0, 1.0, -1.0, 1.0 );
            globalTz = 0;
        }
        else {
            this.pMatrix = perspective( 45, 1, 0.05, 15 );
            this.pMatrix = mult(this.pMatrix, this.camera.cameraMatrix);
            globalTz = -4.5;
        }

        var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");

        gl.uniformMatrix4fv(pUniform, false,
                             new Float32Array(flatten(this.pMatrix)));
    }

    computeViewerPosition()
    {
		gl.uniform4fv( gl.getUniformLocation(shaderProgram, "viewerPosition"),
	        flatten(this.camera.cameraPosition) );
    }

    addModel(model)
    {
        this.models.push(model);
        var gl_model = new GLModel(model, this.next_model_index);
        model.gl_model = gl_model;

        this.model_vertices = this.model_vertices.concat(model.positionArray);
        this.normals = this.normals.concat(model.normalsArray);
        this.initBuffers();

        this.next_model_index += gl_model.size;
    }

    addObject(gl_model)
    {
        var newObject = new myObject(gl_model);
        this.objects.push(newObject);
        return newObject;
    }

    addCamera(camera)
    {
    	this.camera = camera;
    }

    addLightSource(ls)
    {
        this.light_sources.push(ls);
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

        // Vertex Normal Vectors
        triangleVertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
        triangleVertexNormalBuffer.itemSize = 3;
        triangleVertexNormalBuffer.numItems = this.normals.length / 3;           

        // Associating to the vertex shader
        
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 
                triangleVertexNormalBuffer.itemSize, 
                gl.FLOAT, false, 0, 0); 
    }
}

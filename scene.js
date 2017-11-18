class Scene{

    constructor(name, gl, shaderProgram)
    {
        this.name = name;
        this.gl = gl;
        this.shaderProgram = shaderProgram;

        this.objects = [];
        this.light_sources = [];
        this.models = [];

        this.camera = null;
        this.pMatrix = mat4();
        this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        this.near = 0.05;
        this.far = 15;
        this.fieldofview = 45;

        this.next_model_index = 0;
        this.model_vertices = [];
        this.normals = [];
    }

    drawScene(projectionType, primitiveType)
    {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Computing the Projection Matrix
        this.computeProjectionViewMatrix(projectionType);
        this.computeViewerPosition();
        var l = this.light_sources[0];
        this.objects.forEach(function(myObject)
        {
            if(l.isOn)
            	myObject.computeLight(l);
            myObject.drawObject(primitiveType);
        });
    }

    computeProjectionViewMatrix(projectionType)
    {
        this.camera.computeViewMatrix();

        if( projectionType == 0 )
            this.pMatrix = ortho( -1.0, 1.0, -1.0, 1.0, -1.0, 1.0 );
        else
            this.pMatrix = perspective( this.fieldofview, this.aspect, this.near, this.far );

        this.pMatrix = mult(this.pMatrix, this.camera.viewMatrix);

        var pUniform = this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");

        this.gl.uniformMatrix4fv(pUniform, false,
                             new Float32Array(flatten(this.pMatrix)));
    }

    computeViewerPosition()
    {
        var tmp = this.camera.cameraPosition.concat([1]);
		this.gl.uniform4fv( this.gl.getUniformLocation(this.shaderProgram, "viewerPosition"),flatten(tmp));
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
        var newObject = new myObject(gl_model, this.gl, this.shaderProgram);
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
        triangleVertexPositionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model_vertices), this.gl.STATIC_DRAW);
        triangleVertexPositionBuffer.itemSize = 3;
        triangleVertexPositionBuffer.numItems = this.model_vertices.length / 3;

        // Associating to the vertex shader
        this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute,
                triangleVertexPositionBuffer.itemSize,
                this.gl.FLOAT, false, 0, 0);

        // Vertex Normal Vectors
        triangleVertexNormalBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, triangleVertexNormalBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.normals), this.gl.STATIC_DRAW);
        triangleVertexNormalBuffer.itemSize = 3;
        triangleVertexNormalBuffer.numItems = this.normals.length / 3;

        // Associating to the vertex shader
        this.gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute,
                triangleVertexNormalBuffer.itemSize,
                this.gl.FLOAT, false, 0, 0);
    }
}

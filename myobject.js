class myObject{
    constructor(glmodel, gl, shaderProgram)
    {
        this.glmodel = glmodel;
        this.u_mvMatrix = mat4();
        this.gl = gl;
        this.shaderProgram = shaderProgram;

        this.tx = 0;
        this.ty = 0;
        this.tz = 0;

        this.sx = 1;
        this.sy = 1;
        this.sz = 1;

        this.angleXX = 0;
        this.angleYY = 0;
        this.angleZZ = 0;

        this.material = new Material();
    }

    computeMvMatrix()
    {
        this.u_mvMatrix = mat4();
        this.u_mvMatrix = mult( this.u_mvMatrix,translationMatrix( this.tx, this.ty, this.tz ) );
        this.u_mvMatrix = mult( this.u_mvMatrix,rotationXXMatrix( this.angleXX ) );
        this.u_mvMatrix = mult( this.u_mvMatrix,rotationYYMatrix( this.angleYY ) );
        this.u_mvMatrix = mult( this.u_mvMatrix,rotationZZMatrix( this.angleZZ ) );
        this.u_mvMatrix = mult( this.u_mvMatrix,scalingMatrix( this.sx, this.sy, this.sz ) );
        var mvUniform = this.gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
        this.gl.uniformMatrix4fv(mvUniform, false,new Float32Array(flatten(this.u_mvMatrix)));
    }

    drawObject(primitiveType)
    {
        this.computeMvMatrix();
        if(this.glmodel.model.name === "view volume")
        {
            var i;
            for( i = this.glmodel.start; i < this.glmodel.start + (this.glmodel.size - 2); i+=3) 
            {
                this.gl.drawArrays( this.gl.LINE_LOOP,i,3); 
            }
        }
        else if(this.glmodel.model.name === "ray")
        {
            this.gl.drawArrays( this.gl.LINES,this.glmodel.start,this.glmodel.size);
        }
        else 
        {
            this.gl.drawArrays(primitiveType, this.glmodel.start,
                          this.glmodel.size);
        }
    }

    scale(sx, sy, sz)
    {
        this.sx = sx;
        this.sy = sy;
        this.sz = sz;
    }

    rotate(rx, ry, rz )
    {
        this.angleXX = rx;
        this.angleYY = ry;
        this.angleZZ = rz;
    }

    deltarotate(rx, ry, rz )
    {
        this.angleXX += rx;
        this.angleYY += ry;
        this.angleZZ += rz;
    }

    translate(tx, ty, tz)
    {
        this.tx += tx;
        this.ty += ty;
        this.tz += tz;
    }

    positionAt(tx, ty, tz)
    {
        this.tx = tx;
        this.ty = ty;
        this.tz = tz;
    }

    positionAts(v)
    {
        this.tx = v[0];
        this.ty = v[1];
        this.tz = v[2];
    }

    computeLight(lightSource)
    {
        var ambientProduct = mult( this.material.kAmbi, lightSource.ambientIntensity );
        var diffuseProduct = mult( this.material.kDiff, lightSource.intensity );
        var specularProduct = mult( this.material.kSpec, lightSource.intensity );

        this.gl.uniform3fv( this.gl.getUniformLocation(this.shaderProgram, "ambientProduct"), 
            flatten(ambientProduct) );
        this.gl.uniform3fv( this.gl.getUniformLocation(this.shaderProgram, "diffuseProduct"),
            flatten(diffuseProduct) );
        this.gl.uniform3fv( this.gl.getUniformLocation(this.shaderProgram, "specularProduct"),
            flatten(specularProduct) );
        this.gl.uniform1f( this.gl.getUniformLocation(this.shaderProgram, "shininess"), 
            this.material.nPhong );
        this.gl.uniform4fv( this.gl.getUniformLocation(this.shaderProgram, "lightPosition"),
            flatten(lightSource.position) );
    }
}

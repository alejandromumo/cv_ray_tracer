class myObject{
	constructor(glmodel, tx, ty, tz, sx, sy,sz, angleXX, angleYY, angleZZ)
	{
		this.glmodel = glmodel;
		this.u_mvMatrix = mat4();

		// this.localMatrix = mat4(); TODO
		// this.worldMatrix = mat4(); TODO

		this.tx = tx;
		this.ty = ty;
		this.tz = tz;

		this.sx = sx;
		this.sy = sy;
		this.sz = sz;

		this.angleXX = angleXX;
		this.angleYY = angleYY;
		this.angleZZ = angleZZ;
	}

	computeMvMatrix()
	{
		this.u_mvMatrix = translationMatrix( 0, 0, globalTz );

		this.u_mvMatrix = mult( this.u_mvMatrix, 
						      translationMatrix( this.tx, this.ty, this.tz ) );
							 
		this.u_mvMatrix = mult( this.u_mvMatrix,
							  rotationZZMatrix( this.angleZZ ) );
		
		this.u_mvMatrix = mult( this.u_mvMatrix, 
							  rotationYYMatrix( this.angleYY ) );
		
		this.u_mvMatrix = mult( this.u_mvMatrix, 
							  rotationXXMatrix( this.angleXX ) );
		
		this.u_mvMatrix = mult( this.u_mvMatrix, 
							  scalingMatrix( this.sx, this.sy, this.sz ) );
							 
		var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
		
		gl.uniformMatrix4fv(mvUniform, false,
							 new Float32Array(flatten(this.u_mvMatrix)));
	}

	drawObject(primitiveType)
	{
		this.computeMvMatrix();

		if( primitiveType == gl.LINE_LOOP ) {
			
			var i;
			for( i = this.glmodel.start; i < (this.glmodel.size / 3); i++ ) {
			
				gl.drawArrays( primitiveType, 3 * i, 3 ); 
			}
		}	
		else {
			gl.drawArrays(primitiveType, this.glmodel.start,
						  this.glmodel.size); 		
		}	
	}
}
class myObject{
	constructor(glmodel)
	{
		this.glmodel = glmodel;
		this.u_mvMatrix = mat4();

		// this.localMatrix = mat4(); TODO
		// this.worldMatrix = mat4(); TODO

		this.tx = 0;
		this.ty = 0;
		this.tz = 0;

		this.sx = 1;
		this.sy = 1;
		this.sz = 1;

		this.angleXX = 0;
		this.angleYY = 0;
		this.angleZZ = 0;
	}

	computeMvMatrix()
	{
		this.u_mvMatrix = translationMatrix( 0, 0.10, globalTz ); // change for world matrix 

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
		this.tx = tx;
		this.ty = ty;
		this.tz = tz;
	}
}

class camera{

	constructor()
	{
		this.tx = 0;
		this.ty = 0;
		this.tz = 0;

		this.angleXX = 0;
		this.angleYY = 0;
		this.angleZZ = 0;

		this.targetX = 0;
		this.targetY = 0;
		this.targetZ = 0;

		this.cameraMatrix = mat4();
		this.viewMatrix = mat4();
	}

	rotate(angleXX, angleYY, angleZZ)
	{
		this.angleXX = angleXX;
		this.angleYY = angleYY;
		this.angleZZ = angleZZ;
	}

	translate(tx, ty, tz)
	{
		this.tx = tx;
		this.ty = ty;
		this.tz = tz;
	}

	computeCameraMatrix()
	{
		// TODO
	}

	computeViewMatrix()
	{
		// TODO
		this.viewMatrix = inverse(this.cameraMatrix);
	}

	lookAt(x, y, z)
	{	
		// TODO
		this.targetX = x;
		this.targetY = y;
		this.targetZ = z;
	}

}
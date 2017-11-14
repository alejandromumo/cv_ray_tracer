class Camera{

    constructor()
    {
        this.tx = 0;
        this.ty = 0;
        this.tz = 0;

        this.angleXX = 0;
        this.angleYY = 0;
        this.angleZZ = 0;

        this.target = vec4();

        this.cameraMatrix = mat4(); // TODO confirmar o lookAt
        this.viewMatrix = mat4();

        this.cameraPosition = vec4();
    }

    rotate(angleXX, angleYY, angleZZ)
    {
        this.angleXX = angleXX;
        this.angleYY = angleYY;
        this.angleZZ = angleZZ;
    }

    deltaRotate(angleXX, angleYY, angleZZ)
    {
        this.angleXX += angleXX;
        this.angleYY += angleYY;
        this.angleZZ += angleZZ;
    }

    translate(tx, ty, tz)
    {
        this.tx += tx;
        this.ty += ty;
        this.tz += tz;
    }

    positionAt(x,y,z)
    {
        this.cameraPosition[0] = x;
        this.cameraPosition[1] = y;
        this.cameraPosition[2] = z;
    }

    computeCameraMatrix()
    {
        this.cameraMatrix = translationMatrix( globalTx, globalTy, globalTz ); // change for world matrix 
        this.cameraMatrix = mult(this.cameraMatrix, translationMatrix(this.tx, this.ty, this.tz));
         this.cameraMatrix = mult(this.cameraMatrix, rotationXXMatrix(this.angleXX));
        this.cameraMatrix = mult(this.cameraMatrix, rotationYYMatrix(this.angleYY));
          this.cameraMatrix = mult(this.cameraMatrix, rotationZZMatrix(this.angleZZ));

        this.cameraPosition[0] = this.cameraMatrix[0][3];
        this.cameraPosition[1] = this.cameraMatrix[1][3];
        this.cameraPosition[2] = this.cameraMatrix[2][3];

        var up = vec3();
        up[0] = 0;
        up[1] = 1;
        up[2] = 0;
        // this.cameraMatrix = lookAt(this.cameraPosition, this.target, up);
    }

    computeViewMatrix()
    {
        this.viewMatrix = inverse(this.cameraMatrix);
    }


    lookAt(x, y, z)
    {   
        this.target[0] = x;
        this.target[1] = y;
        this.target[2] = z;
        this.target[3] = 1;
    }

}
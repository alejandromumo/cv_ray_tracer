class Camera{

    constructor()
    {
        this.angleXX = 0;
        this.angleYY = 0;
        this.angleZZ = 0;

        this.target = vec3();

        this.cameraMatrix = mat4(); // TODO confirmar o lookAt
        this.viewMatrix = mat4();

        this.cameraPosition = vec3();

        this.up = vec3();
        this.up[0] = 0;
        this.up[1] = 1;
        this.up[2] = 0;

        this.print = 0;
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
        this.cameraPosition[0] += tx;
        this.cameraPosition[1] += ty;
        this.cameraPosition[2] += tz;
    }

    positionAt(x,y,z)
    {

        this.cameraPosition[0] = x;
        this.cameraPosition[1] = y;
        this.cameraPosition[2] = z;
    }

    computeCameraMatrix()
    {
        this.cameraMatrix = mat4();

        this.cameraMatrix = mult(this.cameraMatrix, translationMatrix(this.cameraPosition[0], this.cameraPosition[1], this.cameraPosition[2]));
        this.cameraMatrix = mult(this.cameraMatrix, rotationZZMatrix(this.angleZZ));
        this.cameraMatrix = mult(this.cameraMatrix, rotationYYMatrix(this.angleYY));
        this.cameraMatrix = mult(this.cameraMatrix, rotationXXMatrix(this.angleXX));
        

        this.cameraPosition[0] = this.cameraMatrix[0][3];
        this.cameraPosition[1] = this.cameraMatrix[1][3];
        this.cameraPosition[2] = this.cameraMatrix[2][3];



        // if(this.print < 2)
        // {
        //     console.log("camera position : " + this.cameraPosition);
        //     console.log("target position: " + this.target);
        //     console.log("up vector: " + this.up);
        //     this.cameraMatrix = lookAt(this.cameraPosition, this.target, this.up);
        //     // printMatrix(this.cameraMatrix);
        //     this.print += 1;
        // }
        // else
        //     this.cameraMatrix = lookAt(this.cameraPosition, this.target, this.up);

    }

    computeViewMatrix()
    {
        this.computeCameraMatrix();
        this.viewMatrix = matrix_invert(this.cameraMatrix);
    }


    lookAt(x, y, z)
    {   
        this.target[0] = x;
        this.target[1] = y;
        this.target[2] = z;
    }

}
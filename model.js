class Model{
    constructor(name, positionArray=[], colorArray=[], normalsArray=[])
    {
        this.name = name;
        this.positionArray = positionArray;
        // this.colorArray = colorArray;
        this.normalsArray = normalsArray;
        this.gl_model = null;
    }

    static getCubeModel()
    {
        var cube = new Model("cube");
        cube.positionArray = [
            // FRONT FACE
            -0.25, -0.25,  0.25,

            0.25, -0.25,  0.25,

            0.25,  0.25,  0.25,


            0.25,  0.25,  0.25,

            -0.25,  0.25,  0.25,

            -0.25, -0.25,  0.25,

            // TOP FACE

            -0.25,  0.25,  0.25,

            0.25,  0.25,  0.25,

            0.25,  0.25, -0.25,


            0.25,  0.25, -0.25,

            -0.25,  0.25, -0.25,

            -0.25,  0.25,  0.25,

            // BOTTOM FACE

            -0.25, -0.25, -0.25,

            0.25, -0.25, -0.25,

            0.25, -0.25,  0.25,


            0.25, -0.25,  0.25,

            -0.25, -0.25,  0.25,

            -0.25, -0.25, -0.25,

            // LEFT FACE

            -0.25,  0.25,  0.25,

            -0.25, -0.25, -0.25,

            -0.25, -0.25,  0.25,


            -0.25,  0.25,  0.25,

            -0.25,  0.25, -0.25,

            -0.25, -0.25, -0.25,

            // RIGHT FACE

            0.25,  0.25, -0.25,

            0.25, -0.25,  0.25,

            0.25, -0.25, -0.25,


            0.25,  0.25, -0.25,

            0.25,  0.25,  0.25,

            0.25, -0.25,  0.25,

            // BACK FACE

            -0.25,  0.25, -0.25,

            0.25, -0.25, -0.25,

            -0.25, -0.25, -0.25,


            -0.25,  0.25, -0.25,

            0.25,  0.25, -0.25,

            0.25, -0.25, -0.25,
        ];

        // cube.colorArray = [

        //     // FRONT FACE

        //     1.00,  0.00,  0.00,

        //     1.00,  0.00,  0.00,

        //     1.00,  0.00,  0.00,


        //     1.00,  0.00,  0.00,

        //     1.00,  0.00,  0.00,

        //     1.00,  0.00,  0.00,

        //     // TOP FACE

        //     0.00,  0.00,  0.00,

        //     0.00,  0.00,  0.00,

        //     0.00,  0.00,  0.00,


        //     0.00,  0.00,  0.00,

        //     0.00,  0.00,  0.00,

        //     0.00,  0.00,  0.00,

        //     // BOTTOM FACE

        //     0.00,  1.00,  0.00,

        //     0.00,  1.00,  0.00,

        //     0.00,  1.00,  0.00,


        //     0.00,  1.00,  0.00,

        //     0.00,  1.00,  0.00,

        //     0.00,  1.00,  0.00,

        //     // LEFT FACE

        //     0.00,  0.00,  1.00,

        //     0.00,  0.00,  1.00,

        //     0.00,  0.00,  1.00,


        //     0.00,  0.00,  1.00,

        //     0.00,  0.00,  1.00,

        //     0.00,  0.00,  1.00,

        //     // RIGHT FACE

        //     0.25,  0.50,  0.50,

        //     0.25,  0.50,  0.50,

        //     0.25,  0.50,  0.50,


        //     0.25,  0.50,  0.50,

        //     0.25,  0.50,  0.50,

        //     0.25,  0.50,  0.50,


        //     // BACK FACE

        //     0.25,  0.00,  0.75,

        //     0.25,  0.00,  0.75,

        //     0.25,  0.00,  0.75,


        //     0.25,  0.00,  0.75,

        //     0.25,  0.00,  0.75,

        //     0.25,  0.00,  0.75,
        // ];

        computeVertexNormals(cube.positionArray, cube.normalsArray);
        return cube;
    }

    static getPyramidModel()
    {
        var pyramid = new Model("pyramid");
        pyramid.positionArray = [
            // Base
            0.00 , 0.00 , 0.25, //v0

            0.00 , 0.00 , 0.00, //v3

            0.25 , 0.00 , 0.25, //v1

            0.25 , 0.00 , 0.25, //v1

            0.00 , 0.00 , 0.00, //v3

            0.25 , 0.00 , 0.00, //v2

            // Left side
            0.00 , 0.00 , 0.25, //v0

            0.125, 0.50 , 0.125,//h

            0.00 , 0.00 , 0.00, //v3

            // Right side
            0.25 , 0.00 , 0.00, //v2

            0.125, 0.50 , 0.125,//h

            0.25 , 0.00 , 0.25, //v1

            // Front side
            0.25 , 0.00 , 0.25, //v1

            0.125, 0.50 , 0.125,//h

            0.00 , 0.00 , 0.25, //v0

            // Back side
            0.00 , 0.00 , 0.00, //v3

            0.125, 0.50 , 0.125,//h

            0.25 , 0.00 , 0.00, //v2
        ];

        // pyramid.colorArray = [
        //     // Base
        //     1.00, 0.00, 0.00,

        //     1.00, 0.00, 0.00,

        //     1.00, 0.00, 0.00,

        //     1.00, 0.00, 0.00,

        //     1.00, 0.00, 0.00,

        //     1.00, 0.00, 0.00,

        //     // Left side
        //     0.00, 1.00, 0.00,

        //     0.00, 1.00, 0.00,

        //     0.00, 1.00, 0.00,

        //     // Right side
        //     0.00, 0.00, 1.00,

        //     0.00, 0.00, 1.00,

        //     0.00, 0.00, 1.00,
        //     // Front side
        //     1.00, 0.00, 1.00,

        //     1.00, 0.00, 1.00,

        //     1.00, 0.00, 1.00,
        //     // Back side
        //     0.00, 1.00, 1.00,

        //     0.00, 1.00, 1.00,

        //     0.00, 1.00, 1.00,
        // ];
        computeVertexNormals(pyramid.positionArray, pyramid.normalsArray)
        return pyramid;
    }

    static getFloorModel()
    {
        var floor = new Model("floor");
        floor.positionArray = [
            1.00 , -1.00, 1.00,

            1.00 , -1.00, -1.00,

            -1.00 , -1.00, 1.00,


            -1.00, -1.00,  1.00,

            1.00, -1.00, -1.00,

            -1.00, -1.00, -1.00
        ];

        // floor.colorArray = [
        //     0.25, 0.20, 0,

        //     0.25, 0.20, 0,

        //     0.25, 0.20, 0,

        //     0.25, 0.20, 0,

        //     0.25, 0.20, 0,

        //     0.25, 0.20, 0
        // ];
        computeVertexNormals(floor.positionArray, floor.normalsArray)
        return floor;
    }

    static getBackgroundModel()
    {
        var background = new Model("background");
        background.positionArray = [
            1.00 , -1.00, -1.00,

            1.00 , 1.00, -1.00,

            -1.00 , -1.00, -1.00,

            -1.00, -1.00, -1.00,

            1.00, 1.00, -1.00,

            -1.00, 1.00, -1.00
        ];

        // background.colorArray = [
        //     0.30, 0.30, 0.30,

        //     0.30, 0.30, 0.30,

        //     0.30, 0.30, 0.30,

        //     0.30, 0.30, 0.30,

        //     0.30, 0.30, 0.30,

        //     0.30, 0.30, 0.30,
        // ];
        computeVertexNormals(background.positionArray, background.normalsArray)
        return background;
    }

    static getSphereModel()
    {
        var sphere = new Model("sphere");
        sphere.positionArray = [];  // TODO
        sphere.colorArray = [];     // TODO
    }

    static getVolumeModel()
    {

    }


    static getFromFile(file)
    {
        var reader = new FileReader();
        reader.onload = function( progressEvent ){
            var j=0
            // Entire file read as a string
            // The file lines
            var lines = this.result.split('\n');
            // The new vertices
            var newVertices = [];
            // The new normal vectors
            var newNormals = [];
            // Check every line and store
            for(var line = 0; line < lines.length; line++){
                // The tokens/values in each line
                // Separation between tokens is 1 or mode whitespaces
                var tokens = lines[line].split(/\s\s*/);
                // Array of tokens; each token is a string
                if( tokens[0] == "v" )
                {
                    // For every vertex we have 3 floating point values
                    for( j = 1; j < 4; j++ ) {
                        console.log(parseFloat(tokens[j]))
                        newVertices.push( parseFloat( tokens[ j ] ) );
                    }
                }
                if( tokens[0] == "vn" )
                {
                    // For every normal we have 3 floating point values
                    for( j = 1; j < 4; j++ ) {
                        newNormals.push( parseFloat( tokens[ j ] ) );
                    }
                }
            }

            // Assigning to the current model
            // Checking to see if the normals are defined on the file
            if( newNormals.length == 0 )
            {
               computeVertexNormals( newVertices, newNormals );
            }
            var obj =  new Model(file.name, newVertices, newVertices, newNormals);
            scene.addModel(obj);
            var xD = scene.addObject(obj.gl_model);
            xD.rotate(40,10,20)
            console.log(xD); 
            scene.drawScene(projectionType, primitiveType);
        };
        reader.readAsText(file);
    }
}

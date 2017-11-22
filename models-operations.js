//////////////////////////////////////////////////////////////////////////////
//
//  Functions for processing triangle mesh models
//
//  J. Madeira - Oct. 2015
//
//////////////////////////////////////////////////////////////////////////////


//----------------------------------------------------------------------------
//
//  Computing the triangle unit normal vector
//
//  And associating to every vertex
//

function computeVertexNormals( coordsArray, normalsArray ) {
    
    
    // Clearing the new normals array
    
    normalsArray.splice(0, normalsArray.length);
        
    // Taking 3 vertices from the coordinates array 

    for( var index = 0; index < coordsArray.length; index += 9 )
    {
        
        // Compute unit normal vector for each triangle
        var normal = vec3();
        var p0 = coordsArray.slice(index, index + 3);
        var p1 = coordsArray.slice(index + 3, index + 6);
        var p2 =coordsArray.slice(index + 6, index + 9);
        normal = computeNormalVector(p0,p1,p2);


    
        // Store the unit normal vector for each vertex 

        normalsArray.push(normal[0], normal[1], normal[2]);
        normalsArray.push(normal[0], normal[1], normal[2]);
        normalsArray.push(normal[0], normal[1], normal[2]);
    }
}


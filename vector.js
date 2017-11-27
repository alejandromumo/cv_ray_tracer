//----------------------------------------------------------------------------
//
// Auxiliar functions to work with vectors.
//
//----------------------------------------------------------------------------


//----------------------------------------------------------------------------
//  Vector Constructors

function vec2()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    }

    return result.splice( 0, 2 );
}

function vec3()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    }

    return result.splice( 0, 3 );
}

function vec4()
{
    var result = _argumentsToArray( arguments );
    
    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    case 3: result.push( 1.0 );
    }

    return result.splice( 0, 4 );
}

//----------------------------------------------------------------------------
//  Vector Operations

function normalize( v )
{
    var squaresSum = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    
    var norm = Math.sqrt( squaresSum );
    

        v[0] = v[0] / norm;
        
        v[1] = v[1] / norm;
        
        v[2] = v[2] / norm;
}

function normalized( v )
{
    var result = vec3();
    var squaresSum = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    
    var norm = Math.sqrt( squaresSum );
    

        result[0] = result[0] / norm;
        
        result[1] = result[1] / norm;
        
        result[2] = result[2] / norm;

    return result;
}


//----------------------------------------------------------------------------

function dotProduct( v1, v2 )
{
    var result = 0.0;
    
    for( i = 0; i < v1.length; i++ ) {
        
        result += v1[i] * v2[i];
    }
        
    return result;
}

//----------------------------------------------------------------------------

function vectorProduct( v1, v2 )
{
    var res = vec3();

    res[0] = v1[1] * v2[2] - v1[2] * v2[1];

    res[1] = v1[2] * v2[0] - v1[0] * v2[2];

    res[2] = v1[0] * v2[1] - v1[1] * v2[0];

    return res;
}

//----------------------------------------------------------------------------

function computeNormalVector( p0, p1, p2 )
{
    var v1 = vec3();

    var v2 = vec3();

    var result = vec3();

    v1[0] = p1[0] - p0[0];

    v1[1] = p1[1] - p0[1];

    v1[2] = p1[2] - p0[2];

    v2[0] = p2[0] - p0[0];

    v2[1] = p2[1] - p0[1];

    v2[2] = p2[2] - p0[2];

    result = vectorProduct( v1, v2 );

    normalize( result );

    return result;
}

//----------------------------------------------------------------------------

function multiplyVectorByMatrix( m, p )
{
    var result = vec4();
    
    for( var i = 0; i < 4; i++ ) {
        
        for( var j = 0; j < 4; j++ ) {  // Can stop earlier; 4th coord is ZERO !!
        
                result[i] += m[i][j] * p[j];
        }
    }
    
    return result;
}

//----------------------------------------------------------------------------
function add(u,v)
{
    var result = vec3();
    result[0] = u[0] + v[0];
    result[1] = u[1] + v[1];
    result[2] = u[2] + v[2];
    return result;
}
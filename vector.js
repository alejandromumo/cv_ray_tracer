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

function computeMidPoint( p1, p2 )
{
    var result = vec3();
    
    for( i = 0; i < 3; i++ ) {
        
        result[i] = ( p1[i] + p2[i] ) / 2.0;
        
    }
        
    return result;
}

function computeCentroid( p1, p2, p3 )
{
    var result = vec3();
    
    for( i = 0; i < 3; i++ ) {
        
        result[i] = ( p1[i] + p2[i] + p3[i]) / 3.0;
        
    }
        
    return result;
}

function normalize( v )
{
    var squaresSum = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    
    var norm = Math.sqrt( squaresSum );
    
    v[0] /= norm;
    
    v[1] /= norm;
    
    v[2] /= norm;
}

//----------------------------------------------------------------------------

function symmetric( v )
{
    var result = vec3();
    
    for( i = 0; i < 3; i++ ) {
        
        result[i] = - v[i];
    }
        
    return result;
}

//----------------------------------------------------------------------------

function dotProduct( v1, v2 )
{
    var result = 0.0;
    
    for( i = 0; i < 3; i++ ) {
        
        result += v1[i] * v2[i];
    }
        
    return result;
}

//----------------------------------------------------------------------------

function vectorProduct( v1, v2 )
{
    var res = vec3();

    res[0] = v1[1] * v2[2] - v1[2] * v2[1];

    res[1] = - ( v1[0] * v2[2] - v1[2] * v2[0] );

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

function multiplyPointByMatrix( m, p )
{
    var result = vec4();
    
    for( var i = 0; i < 4; i++ ) {
        
        for( var j = 0; j < 4; j++ ) {
        
                result[i] += m[i][j] * p[j];
        }
    }
    
    return result;
}

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
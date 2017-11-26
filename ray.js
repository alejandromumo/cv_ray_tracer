class Ray{

    constructor(ox, oy, oz, px, py, pz){
        this.origin = [ox, oy, oz];
        this.dir = [px-ox,py-oy,pz-oz];
        normalize(this.dir)
        this.size = 1;
    }

    logRay(){
        console.log("Drawing a ray : origin="+this.origin+" dir="+this.dir)
    }

    drawRay(scene, x,y,z){
        this.logRay();
        var Ray_Model = Model.getRayModel(this.dir, this.size);
        scene.addModel(Ray_Model)
        scene.initBuffers();
        var ray = scene.addObject(Ray_Model.gl_model)
        ray.positionAt(x,y,z);
    }

    static testSphereIntersectionSphere( ray, sphere ){
        var intersection = vec3()
        var P = vec3()
        var C = vec3()
        var L = vec3()
        var tca;
        var d2;
        var thc;
        var radius2;
        var t0;
        C[0] = sphere.tx
        C[1] = sphere.ty
        C[2] = sphere.tz
//        console.log("C-"+C)
        L[0] = sphere.tx - ray.origin[0]
        L[1] = sphere.ty - ray.origin[1]
        L[2] = sphere.tz - ray.origin[2]
//        console.log("L-"+L)

        tca = dotProduct(L,ray.dir)
//        console.log("tca-"+tca)
        if (tca < 0 ) return null

        d2 = dotProduct(L,L) - (tca*tca)
        radius2 = Math.pow(sphere.sx,2)
//        console.log("d2-"+d2)
//        console.log("radius2-"+radius2)
        if (d2 > radius2 ) return null

        thc = Math.sqrt(radius2-d2)
//        console.log("thc-"+thc)
    
        t0 = tca-thc

        intersection[0] = ray.origin[0] + (ray.dir[0]*t0)
        intersection[1] = ray.origin[1] + (ray.dir[1]*t0)
        intersection[2] = ray.origin[2] + (ray.dir[2]*t0)
        console.log("Returning an intersection - " + intersection)
        return [intersection, C];
        // returns:
        // [vec3(), vec3()]
        // null
    }
}

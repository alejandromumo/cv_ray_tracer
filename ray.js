class Ray{

    constructor(ox, oy, oz, px,py,pz){
        this.origin = [ox, oy, oz];
        this.dir = [px-ox,py-oy,pz-oz];
        normalize(this.dir)
        this.size = 10;
    }

    logRay(){
        console.log("origin="+this.origin+" dir="+this.dir)
    }

    drawRay(scene, x,y,z){
        this.logRay()
        var Ray_Model = Model.getRayModel(this.dir, this.size);
        console.log(Ray_Model)
        scene.addModel(Ray_Model)
        var ray = scene.addObject(Ray_Model.gl_model)
        ray.positionAt(x,y,z );
    }
}

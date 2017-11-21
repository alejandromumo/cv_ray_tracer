class Ray{

    constructor(ox, oy, oz, px,py,pz){
        this.origin = [ox, oy, oz];
        this.dir = [px-ox, py-oy, pz-oz];
        normalize(this.dir)
        this.size = 10;
    }

    logRay(){
        console.log("origin="+this.origin+" dir="+this.dir)
    }
}

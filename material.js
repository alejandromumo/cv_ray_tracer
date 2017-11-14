class Material{
    constructor()
    {
        this.kAmbi = [0.0, 0.0, 0.0];
        this.kDiff = [0.0, 0.0, 0.0];
        this.kSpec = [0.0, 0.0, 0.0];
        this.nPhong = 100; 
    }

    kAmbient(r, g, b)
    {
        this.kAmbi = [r,g,b];
    }

    kDiffuse(r, g, b)
    {
        this.kDiff = [r,g,b];
    }

    kSpecular(r, g, b)
    {
        this.kSpec = [r,g,b];
    }

    nPhongs(n)
    {
        this.nPhong = n;
    }

}
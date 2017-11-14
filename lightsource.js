class LightSource{  
    constructor()
    {
        // A new light source is always on
        this.isOn = true;
        
        // And is directional
        this.position = [ 0.0, 0.0, 1.0, 0.0 ];
        
        // White light
        this.intensity = [ 1.0, 1.0, 1.0 ];
        
        // Ambient component
        this.ambientIntensity = [ 0.2, 0.2, 0.2 ];
        
        // Animation controls
        this.rotXXOn = false;
        this.rotYYOn = false;
        this.rotZZOn = false;
        
        // Rotation angles  
        this.rotAngleXX = 0.0;
        this.rotAngleYY = 0.0;
        this.rotAngleZZ = 0.0;  
            
        this.rotationSpeed = 1.0;
    }

    state()
    {
        return this.isOn;
    }

    switchOff()
    {
        this.isOn = false;
    }

    switchOn()
    {
        this.isOn = true;
    }

    translate(x, y, z)
    {
        this.position[0] += x;
        
        this.position[1] += y;
        
        this.position[2] += z;
    }

    positionAt(x,y,z)
    {
        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;
    }

    type(w)
    {
        this.position[3] = w;
    }

    intensity(r, g, b)
    {
        this.intensity[0] = r;
        
        this.intensity[1] = g;
        
        this.intensity[2] = b;
    }

    ambientIntensity(r, g, b)
    {
        this.ambientIntensity[0] = r;
        
        this.ambientIntensity[1] = g;
        
        this.ambientIntensity[2] = b;
    }

    switchRotYYOn() // TODO Rotation not working
    {
        this.rotYYOn = true;
    }


    switchRotYYOff() // TODO Rotation not working
    {
        this.rotYYOff = false;
    }

    direct(x,y,z)
    {
        this.direction[0] = x;
        this.direction[1] = y;
        this.direction[2] = z;
    }
}
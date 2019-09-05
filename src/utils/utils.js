
export const tryFn = (fn, fallback) => {
    fallback = (fallback) ? fallback : null;
    try {
        return fn();
    }   catch (e) {
       return fallback;
    }
};


const yalmDivisor = 46.72897196;

export const locationToYaml = (coord) => {
    const {x,y,z} = coord;

    let yalmPos = {
        x: (x+1000)/yalmDivisor,
        y: (y+1000)/yalmDivisor,
        z: (z/2)/yalmDivisor
    }

    yalmPos = {
        x: yalmPos.x.toFixed(1),
        y: yalmPos.y.toFixed(1),
        z: yalmPos.z.toFixed(1)
    }

    return yalmPos
};


export const mapCoordToYalm = (coord) => {
    const loc = mapCoordToLocation(coord);
    const yalmPos = locationToYaml(loc);

    return yalmPos;
};

export const yalmToLocation = (coord) => {
    const {x,y,z} = coord;

    return {
        x: (x*yalmDivisor)-1000,
        y: (y*yalmDivisor)-1000,
        z: (z*yalmDivisor)-1000
    }
};

export const yalmToMapCoord = (coord) =>{
    const toLoc = yalmToLocation(coord);
    return locationToMapCoord(toLoc);
};

export const locationToMapCoord = (coord) => {
    const {x,y,z} = coord;

    return {
        x: (x+1000)/4,
        y: (y+1000)/4,
        z: z/4
    };
};

export const mapCoordToLocation = coord => {
    const {x,y,z} = coord;

    return {
        x: (x*4)-1000,
        y: (y*4)-1000,
        z: z*4
    };
};

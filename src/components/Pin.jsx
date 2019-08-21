import React, {useEffect, useState} from 'react';

const Pin = (props) => {

    const {locX, locY, scale, map, offset} = props;

    const [loc, setLoc] = useState({x:locX, y:locY});
    const [lastLoc, setLastLoc] = useState({x:locX, y:locY});

    const [lastScale, setLastScale] = useState(1)



    useEffect(() => {
        console.log(map.current.getBoundingClientRect());

        const mapSize = map.current.getBoundingClientRect();

        const ratio = {
            x: locX/(mapSize.width/scale),
            y: locY/(mapSize.height/scale)
        }

        console.log('ratio', ratio);

        // setLoc({
        //         x: ratio.x*mapSize.width,
        //         y: ratio.y*mapSize.height,
        //     })
        //determine quadrant

        if(scale > lastScale) {
            setLoc({
                x: (ratio.x > 0.5) ? loc.x + ((0.2 * lastLoc.x)) : loc.x - ((0.2 * lastLoc.x)),
                y: (ratio.y > 0.5) ? loc.y + ((0.2 * lastLoc.y)) : loc.y - ((0.2 * lastLoc.y)),
            })
        }

        if(scale < lastScale) {
            setLoc({
                x: (ratio.x > 0.5) ? loc.x - ((0.2 * lastLoc.x)) : loc.x + ((0.2 * lastLoc.x)),
                y: (ratio.y > 0.5) ? loc.y - ((0.2 * lastLoc.y)) : loc.y + ((0.2 * lastLoc.y)),
            })
        }

        setLastLoc(loc);
        setLastScale(scale)

    }, [scale]);


    console.log("loc", loc)

    const style = {
        transform: `translate(${loc.x+offset.x}px, ${loc.y+offset.y}px)`
    };

    return (<img src="./pin.png" style={style}/>)
};

export default Pin;

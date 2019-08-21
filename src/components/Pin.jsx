import React, {useEffect, useState} from 'react';

const Pin = (props) => {

    const {locX, locY, scale} = props;

    const [lastScale, setLastScale] = useState(1);

    useEffect(() => {

        const antiScale = 1/scale

        setLastScale(scale)

    }, [scale]);

    const style = {
        transform: `translate(${locX}px, ${locY}px) scale(${1/(scale*0.7)})`,
        transition: "transform 0.2s ease-in",
        position: 'fixed'
    };

    return (
        <div className="map-pin">
            {/*<div style={style}>Map Location</div>*/}
            <img src="./pin.png" style={style}/>
        </div>)
};

export default Pin;

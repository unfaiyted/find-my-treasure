import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import '../css/pin.scss';

const Pin = (props) => {

    const {locX, locY, scale, icon} = props;

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
        <div className="map-pin" style={style}>
            <div className="info">Map Location</div>
            <img src={`./${icon}.png`} />
        </div>)
};

Pin.propTypes = {
    icon: PropTypes.string
}

Pin.defaultProps = {
    icon: "pin"
}


export default Pin;

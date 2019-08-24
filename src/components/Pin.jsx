import React from 'react';
import PropTypes from "prop-types";
import '../css/pin.scss';

const Pin = (props) => {

    const {loc, scale, icon} = props;

    const style = {
        transform: `translate(${loc.x}px, ${loc.y}px) scale(${1/(scale*0.7)})`,
        transition: "transform 0.2s ease-in",
        position: 'fixed'
    };

    return (
        <div className="map-pin" style={style}>
            <div className="info">{loc.x}x {loc.y}y</div>
            <img src={`./${icon}.png`} />
        </div>)
};

Pin.propTypes = {
    icon: PropTypes.string,
    loc: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    })
}

Pin.defaultProps = {
    icon: "x"
}


export default Pin;

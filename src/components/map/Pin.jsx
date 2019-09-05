import React from 'react';
import PropTypes from "prop-types";
import '../../css/pin.scss';
import {mapCoordToYalm} from "../../utils/utils";

const Pin = (props) => {

    const {loc, scale, icon, type, width, height, hoverText} = props;


    const style = {
        transform: `translate(${loc.x}px, ${loc.y-9}px) scale(${1/(scale*0.7)})`,
        transition: (type === "static") ? "all 0.2s ease-in" : "transform 0.2s linear",
        position: 'fixed',
    };

    const pinSize = {
      width,
      height
    };

    const yalm = mapCoordToYalm(loc);

    return (
        <div className="map-pin" style={style}>
            <div className="info">
                <p>{hoverText}</p>
            </div>
            <img src={`./${icon}.png`} style={pinSize} />
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
    icon: "x",
    type: "static",
    width: 18,
    height: 18
}


export default Pin;

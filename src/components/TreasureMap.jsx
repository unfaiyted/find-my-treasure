import React from 'react';
import "../css/treasure-map.scss";
import PropTypes from "prop-types";
import Icon from "./Icon";


const TreasureMap = (props) => {

    const {location, id} = props;
    const style = {
        backgroundImage: `url("./treasure-maps/${location}-${id}.png)`,
    };

    console.log(`/${location}-${id}`);

    return (

        <div className="treasure-map" style={style}>
       <img src={`./treasure-maps/${location}-${id}.png`} width={220} height={160} />
    </div>

            )
};


TreasureMap.propTypes = {
   location: PropTypes.string,
   id: PropTypes.number

}

TreasureMap.defaultProps = {
   location: "fringes",
    id: 1
}


export default TreasureMap;

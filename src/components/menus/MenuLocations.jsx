import React, {useState} from 'react';
import PropTypes from "prop-types";
import HeaderButton  from "../ui/HeaderButton"
import "../../css/menu.scss";
import LocationList from "../ui/LocationList";
import Window from "../Window"


let MenuLocations;
MenuLocations = (props) => {

    const { onClick, id, active } = props;

    const [activeGroup, setGroup] = useState("All");

    return <Window name="Locations" onClick={onClick} width={350} height={540} id={id} active={active}>
                <div className="menu-group">
                    <HeaderButton text="All" onClick={() => setGroup("All")} activeGroup={activeGroup}/>
                    <HeaderButton text="HW" onClick={() => setGroup("HW")} activeGroup={activeGroup}/>
                    <HeaderButton text="SB" onClick={() => setGroup("SB")} activeGroup={activeGroup}/>
                    <HeaderButton text="ShB" onClick={() => setGroup("ShB")} activeGroup={activeGroup}/>
                </div>

                <hr/>

                <div className="menu-selected-group">
                    <LocationList group={activeGroup}/>
                </div>
      </Window>
};

MenuLocations.propTypes =  {
 onClick: PropTypes.func,

};

MenuLocations.defaultProps = {
    name: "Locations"
};

export default MenuLocations;

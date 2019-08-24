import React, {useState} from 'react';
import PropTypes from "prop-types";
import MenuHeaderItem  from "./MenuHeaderItem"
import "../css/menu.scss";
import MenuList from "./MenuList";
import Window from "./Window"


let MenuLocations;
MenuLocations = (props) => {

    const {
        onClick,
        id,
        active
    } = props;

    const [activeGroup, setGroup] = useState("All");

    return <Window name="Locations" onClick={onClick} width={350} height={540} id={id} active={active}>
                <div className="menu-group">
                    <MenuHeaderItem text="All" onClick={() => setGroup("All")} activeGroup={activeGroup}/>
                    <MenuHeaderItem text="HW" onClick={() => setGroup("HW")} activeGroup={activeGroup}/>
                    <MenuHeaderItem text="SB" onClick={() => setGroup("SB")} activeGroup={activeGroup}/>
                    <MenuHeaderItem text="ShB" onClick={() => setGroup("ShB")} activeGroup={activeGroup}/>
                </div>

                <hr/>

                <div className="menu-selected-group">
                    <MenuList group={activeGroup}/>
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

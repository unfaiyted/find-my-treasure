import React, {useState} from 'react';
import MenuItem  from "./MenuItem"
import "../css/menu.scss";
import MenuGroupList from "./MenuGroupList";
import MenuContainer from "./MenuContainer";

let MenuLocations;
MenuLocations = (props) => {

    const {
        onClick,
        id
    } = props;

    const [activeGroup, setGroup] = useState("All");

    return <MenuContainer name="Locations" onClick={onClick} width={350} height={540} id={id}>
                <div className="menu-group">
                    <MenuItem text="All" onClick={() => setGroup("All")} activeGroup={activeGroup}/>
                    <MenuItem text="HW" onClick={() => setGroup("HW")} activeGroup={activeGroup}/>
                    <MenuItem text="SB" onClick={() => setGroup("SB")} activeGroup={activeGroup}/>
                    <MenuItem text="ShB" onClick={() => setGroup("ShB")} activeGroup={activeGroup}/>
                </div>

                <hr/>

                <div className="menu-selected-group">
                    <MenuGroupList group={activeGroup}/>
                </div>
      </MenuContainer>
};

MenuLocations.propTypes =  {

};

MenuLocations.defaultProps = {
    name: "Locations"
};

export default MenuLocations;

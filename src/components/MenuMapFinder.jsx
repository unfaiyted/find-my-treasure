import React, {useState} from 'react';
import TreasureMap from "./TreasureMap";
import {useStateValue} from "../AppContext";
import MapSelector from "./MapSelector";
import MenuHeaderItem from "./MenuHeaderItem";
import Window from "./Window"

const MenuMapFinder = (props) => {

    const  [{chosenLocation}, dispatch] = useStateValue();
    const [selected, setSelected] = useState(1);

    const { id, active, onClick } = props;


    const getSelected = (id) => {
        setSelected(id);
    };


    return <Window name="FindMyMap" width={350} height={330} id={id} active={active} onClick={onClick}>
        <div className="menu-group center">
            <div className="info">{chosenLocation}</div>
            <MenuHeaderItem text="Gliderskin"/>
            <MenuHeaderItem text="Zonureskin"/>
        </div>
        <hr/>
       <TreasureMap id={selected} location={chosenLocation}/>
        <MapSelector selected={getSelected}/>
    </Window>
};

MenuMapFinder.propTypes =  {

};

MenuMapFinder.defaultProps = {
    name: "Locations"
};

export default MenuMapFinder;

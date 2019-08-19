import React, {useState, useContext} from 'react';
import MenuContainer from "./MenuContainer";
import TreasureMap from "./TreasureMap";
import {useStateValue} from "../AppContext";
import MapSelector from "./MapSelector";
import MenuItem from "./MenuItem";


const MenuMapFinder = (props) => {

    const  [{chosenLocation}, dispatch] = useStateValue();
    const [selected, setSelected] = useState(1);

    const { id } = props;


    const getSelected = (id) => {
        setSelected(id);
    };


    return <MenuContainer name="FindMyMap" width={350} height={330} id={id}>

        <div className="menu-group center">
            <div className="info">{chosenLocation}</div>
            <MenuItem text="Gliderskin"/>
            <MenuItem text="Zonureskin"/>
        </div>

        <hr/>


       <TreasureMap id={selected} location={chosenLocation}/>
        <MapSelector selected={getSelected}/>
    </MenuContainer>
};

MenuMapFinder.propTypes =  {

};

MenuMapFinder.defaultProps = {
    name: "Locations"
};

export default MenuMapFinder;

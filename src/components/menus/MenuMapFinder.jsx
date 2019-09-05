import React, {useState} from 'react';
import TreasureMap from "../ui/TreasureMap";
import {useStateValue} from "../../AppContext";
import MapSelector from "../ui/CarouselSelector";
import HeaderButton from "../ui/HeaderButton";
import Window from "../Window"

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
            <HeaderButton text="Gliderskin"/>
            <HeaderButton text="Zonureskin"/>
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

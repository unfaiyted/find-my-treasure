import React, {useState, useContext} from 'react';
import "../css/menu.scss";
import MenuContainer from "./MenuContainer";
import TreasureMap from "./TreasureMap";


const MenuMapFinder = (props) => {

    const { id } = props;


    return <MenuContainer name="FindMyMap" width={350} height={250} id={id}>
       <TreasureMap/>
        {/*{app.chosenMap}*/}
    </MenuContainer>
};

MenuMapFinder.propTypes =  {

};

MenuMapFinder.defaultProps = {
    name: "Locations"
};

export default MenuMapFinder;

import React, {useState, useEffect} from 'react';
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import "../css/menu.scss";
import {useWindow} from "./useWindow";


const MenuContainer = (props) => {

    const {
        name,
        id,
        onClick,
        width,
        height,
        children
    } = props;

    let defaultX = (window.innerWidth / 2) - 225;
    let defaultY = (window.innerHeight / 2) - 300;

    if(localStorage.getItem("menu" + name) !== null) {
        const newPos = JSON.parse(localStorage.getItem("menu" + name));
        defaultX = newPos.x;
        defaultY = newPos.y;
    }

    const [activeGroup, setGroup] = useState("All");
    const { toggle } = useWindow(id);
    const [pos, setPos] = useState({x: defaultX, y: defaultY});

    const style = {
        backgroundImage: `url("./menu-bg.png")`,
        width,
        height,
    };

    const handleDrag = (e, ui) => {
        setPos({x: pos.x+ ui.deltaX , y: pos.y + ui.deltaY })
    };

    const handleStop = () =>{
        localStorage.setItem("menu" + name, JSON.stringify(pos));
    };

    return <Draggable
        defaultPosition={{x: pos.x, y: pos.y}}
        position={null}
        onDrag={handleDrag}
        onStop={handleStop}
        // scale={1}
    >
        <div className="menu-container" style={style}>
            <div className="menu" >
                <div className="header">
                    <h2>{name}</h2>
                    <div className="close" onClick={toggle}><img src="./exit.png"/></div>
                </div>
                {children}
            </div>
        </div>
    </Draggable>
};

MenuContainer.propTypes =  {

};

MenuContainer.defaultProps = {
    name: "Locations"
};

export default MenuContainer;


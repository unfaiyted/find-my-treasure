import React, {useState, useEffect} from 'react';
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import "../css/window.scss";
import "../css/menu.scss";
import {useWindow} from "./hooks/use-window";


const Window = (props) => {

    const {
        name,
        id,
        width,
        height,
        type,
        children,
        onClick,
        active
    } = props;

    let defaultX = (window.innerWidth / 2) - (width/2);
    let defaultY = (window.innerHeight / 2) - (height/2);

    if(localStorage.getItem(id) !== null) {
        const newPos = JSON.parse(localStorage.getItem(id));
        defaultX = newPos.x;
        defaultY = newPos.y;
    }

    const { toggle } = useWindow(id);
    const [pos, setPos] = useState({x: defaultX, y: defaultY});

    const style = {
        backgroundImage: `url("./${type}-bg.png")`,
        width,
        height,
    };

    const handleDrag = (e, ui) => {
        setPos({x: pos.x+ ui.deltaX , y: pos.y + ui.deltaY })
    };

    const handleStop = () =>{
        localStorage.setItem(id, JSON.stringify(pos));
    };

    const activeClass = (active) ? "active" : 'not-active';

    return <Draggable
        defaultPosition={{x: pos.x, y: pos.y}}
        position={null}
        handle=".header"
        onDrag={handleDrag}
        onStop={handleStop}
        // scale={1}
    >
        <div className={[`${type}-container`, activeClass].join(" ")} style={style} onClick={onClick}>

            <div className={type} >
                <div className="header">
                    <h2>{name}</h2>
                    <div className="close" onClick={toggle}><img src="./exit.png" alt="exit"/></div>
                </div>
                {children}
            </div>
        </div>
    </Draggable>
};

Window.propTypes =  {
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    children: PropTypes.node
};

Window.defaultProps = {
    name: "Window",
    type: "menu"
};

export default Window;


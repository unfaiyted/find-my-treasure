import React, {useState} from 'react'
import PropTypes from "prop-types"
import "../../css/icon.scss";
import Draggable from "react-draggable";
import { useWindow } from "../hooks/use-window";

const Icon = (props) => {

    const { name, width, height, window, noOverlay} = props;


    const win = useWindow(window);

    console.log(win);

    let defaultX = 0;
    let defaultY = 0;

    if(localStorage.getItem("icon" + name) !== null) {
        const newPos = JSON.parse(localStorage.getItem("icon" + name));
        defaultX = newPos.x;
        defaultY = newPos.y;
    }

    const [pos, setPos] = useState({x: defaultX, y: defaultY});
    const offset = width/10;

    const style = {
        backgroundImage: `url(./${name}.png)`,
        backgroundSize: `${width-offset}px ${height-offset}px`,
        width,
        height,
    };

    const handleDrag = (e, ui) => {
        setPos({x: pos.x+ ui.deltaX , y: pos.y + ui.deltaY })
    };

    const handleStop = () =>{
        localStorage.setItem("icon" + name, JSON.stringify(pos));
    };


  return (
      <Draggable
          defaultPosition={{x: defaultX, y: defaultY}}
          position={null}
          onDrag={handleDrag}
          onStop={handleStop}
          scale={1}
      >
      <div className="icon-container" onClick={win.toggle}>
      <div className="icon" style={style}>
          {!noOverlay && <img src="./icon-overlay.png" style={{width, height, }}/>}
      </div>
      </div>
      </Draggable>
  )
};

Icon.propTypes = {
    name: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    onClick: PropTypes.func,
    noOverlay: PropTypes.bool
};

Icon.defaultProps = {
    name: "map-command",
    width: 40,
    height: 40,
    noOverlay: false,
};

export default Icon;

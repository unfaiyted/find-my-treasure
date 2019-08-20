import React, {useState, useContext, useLayoutEffect, useRef} from 'react';
import Window from "./Window";
import {useStateValue} from "../AppContext";


const MapWindow = (props) => {

    const mapRef = useRef();

    const  [{chosenLocation}, dispatch] = useStateValue();
    const [zoomLevel, setZoomLevel] = useState(100);
    const [isActive, setActive] = useState(false);
    const [initial, setInitial] = useState({x:0,y:0});
    const [current, setCurrent] = useState({x:0,y:0});
    const [offset, setOffset] = useState({x:0,y:0});

    const { id } = props;


    const width=500;
    const height=500;

    const style = {
        backgroundImage: `url("./maps/southernThanalan.png")`,
        backgroundSize: `${zoomLevel}%`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: current.x,
        backgroundPositionY: current.y,
        transition: "all 0.0s ease",
        width,
        height
    };

    const zoomIn = (e) => {
        console.log(e)

        const ratio = 1 -  (zoomLevel+10)/zoomLevel;

        setZoomLevel(zoomLevel + 10);

            setCurrent({
                x: current.x + (e.clientX - current.x) * ratio,
                y: current.y + (e.clientY - current.y) * ratio,
            })

            setOffset({
                x: current.x,
                y: current.y
            })
    };

    const zoomOut = (e) => {

        const ratio = 1 - (zoomLevel-10)/zoomLevel;

        setZoomLevel(zoomLevel - 10);

        setCurrent({
            x: current.x + (e.clientX - current.x) * ratio,
            y: current.y + (e.clientY - current.y) * ratio,
        })

        setOffset({
            x: current.x,
            y: current.y
        })

    }

    const wheelZoom = (e) => {
             console.log(e);
        (e.deltaY>0) ? zoomIn(e) : zoomOut(e)
    };

    const dragStart = (e) => {
        console.log("mouse down");

        setInitial({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
        });

        setActive(true);

    };
    const dragEnd = (e) => {
        console.log("mouse up");
        setInitial({x:current.x, y: current.y});
        setActive(false);
    };
    const drag = (e) => {

        if(isActive) {
            console.log("mouse moving",e);
            e.preventDefault();

            setCurrent({
                x: e.clientX - initial.x,
                y: e.clientY - initial.y,
            })

            setOffset({
                x: current.x,
                y: current.y
            })
        }
    };




    useLayoutEffect(() => {
        const {current} = mapRef;
        current.addEventListener("wheel", wheelZoom);

        current.addEventListener("mousedown", dragStart);
        current.addEventListener("mouseup", dragEnd);
        current.addEventListener('mousemove', drag);

        return () => {
            current.removeEventListener("wheel", wheelZoom);

            current.removeEventListener("mousedown", dragStart);
            current.removeEventListener("mouseup", dragEnd);
            current.removeEventListener('mousemove', drag);

        }
    });

    return <Window name="MapWindow" width={width} height={height} id={id}>
        <div className="map" style={style} ref={mapRef}>

        </div>
    </Window>
};

MapWindow.propTypes =  {

};

MapWindow.defaultProps = {
    name: "Locations"
};

export default MapWindow;

import React, {useState, useContext, useLayoutEffect, useRef} from 'react';
import Window from "./Window";
import {useStateValue} from "../AppContext";
import Pin from "./Pin"

const MapWindow = (props) => {

    const mapContainerRef = useRef();
    const mapRef = useRef();

    const zoomFactor = 0.2;
    const maxScale = 5;

    const  [{chosenLocation}, dispatch] = useStateValue();
    const [scale, setScale] = useState(1);
    const [isActive, setActive] = useState(false);
    const [initial, setInitial] = useState({x:0,y:0});
    const [current, setCurrent] = useState({x:0,y:0});
    const [offset, setOffset] = useState({x:0,y:0});
    const [mapLayer, setMapLayer] = useState({
        width: 500,
        height: 500
    })


    const size = {
        w: 500,
        h: 500
    };

    const { id } = props;

    const width=500;
    const height=400;

    const style = {
        // backgroundImage: `url("./maps/southernThanalan.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `100%`,
        overflow: "hidden",
        transform: `translate3d(${current.x}px, ${current.y}px, 0) scale(${scale},${scale})`,
        transition: "transform 0.00s",
        width: "100%",
        minHeight: height
    };


    const wheelZoom = (e) => {
        e.preventDefault();

        const container = mapContainerRef.current.getBoundingClientRect();

        let delta = e.deltaY;

        delta = Math.max(-1,Math.min(1,delta))*-1; // cap the delta to [-1,1] for cross browser consistency

        console.log(e)

        const zoomPoint = {
            x: e.pageX - container.left,
            y: e.pageY - container.top,
        }

        console.log(zoomPoint);

        const zoomTarget = {
            x: (zoomPoint.x - current.x)/scale,
            y: (zoomPoint.y - current.y)/scale
        }

        // setZoomPoint(e.pageX = offset)

        let currScale = (delta*zoomFactor*scale) + scale;
        currScale = Math.max(1,Math.min(maxScale,currScale))

        let pos = {
            x:  -zoomTarget.x * currScale + zoomPoint.x,
            y:  -zoomTarget.y * currScale + zoomPoint.y,
        }

        if(pos.x>0)
            pos.x = 0;
        if(pos.x+size.w*scale<size.w)
            pos.x = -size.w*(scale-1)
        if(pos.y>0)
            pos.y = 0
        if(pos.y+size.h*scale<size.h)
            pos.y = -size.h*(scale-1)

        setScale(currScale);
        // setCurrent({
        //     x: pos.x,
        //     y: pos.y,
        // })

        setOffset({
            x: current.x,
            y: current.y
        })


        console.log(mapRef.current.getBoundingClientRect());

        setMapLayer({
            overflow: "hidden",
            transform: `translate3d(${current.x}px, ${current.y}px, 0) scale(${scale},${scale}) `,
        });

    };

    const dragStart = (e) => {
        e.preventDefault();
        console.log("mouse down");

        setInitial({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
        });

        setActive(true);

    };
    const dragEnd = (e) => {
        e.preventDefault();
        console.log("mouse up");
        setInitial({x:current.x, y: current.y});
        setActive(false);
    };
    const drag = (e) => {
        e.preventDefault();
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

            setMapLayer({
                width: mapRef.current.getBoundingClientRect().width || width,
                height: mapRef.current.getBoundingClientRect().height || height,
                overflow: "hidden",
                transform: `translate3d(${current.x}px, ${current.y}px, 0) `,
            });

        }
    };

    const resetMap = (e) => {
        setCurrent({
            x: 0,
            y: 0
        });

        setOffset({
            x: current.x,
            y: current.y
        });

        setScale(1)
    };

    useLayoutEffect(() => {
        const {current} = mapContainerRef;
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
        <div className="map-container"  ref={mapContainerRef} style={{height, width}} onDoubleClick={resetMap}>
            <div className="map-info-layer" style={mapLayer}>
                <Pin locX={170} locY={115} offset={offset} scale={scale} map={mapRef}/>
            </div>
            <div className="map">
            <img src="./maps/southernThanalan.png"  ref={mapRef} style={style}/>
            </div>
        </div>
    </Window>
};

MapWindow.propTypes =  {

};

MapWindow.defaultProps = {
    name: "Locations"
};

export default MapWindow;

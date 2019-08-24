import React, {useState, useEffect, useRef} from 'react';
import Window from "./Window";
import MapPinLayer from "./MapPinLayer";
import "../css/map.scss";

const MapWindow = (props) => {

    const mapContainerRef = useRef();
    const mapRef = useRef();

    const zoomFactor = 0.2;
    const maxScale = 5;

    const [scale, setScale] = useState(1);
    const [isActive, setActive] = useState(false);
    const [initial, setInitial] = useState({x:0,y:0});
    const [current, setCurrent] = useState({x:0,y:0});
    const [offset, setOffset] = useState({x:0,y:0});
    const [pointer, setPointer] = useState({x:0,y:0});

    const { id, onClick, active } = props;

    const width=500;
    const height=400;

    const style = {
        backgroundRepeat: "no-repeat",
        backgroundSize: `100%`,
         overflow: "hidden",
        transform: `translate3d(${current.x}px, ${current.y}px, 0) scale(${scale},${scale})`,
        transition: "transform 0.00s",
        transformOrigin: "0 0",
        width: "100%",
        minHeight: height,
    };

    const wheelZoom = (e, zoomMultiplier = 1) => {
        e.preventDefault();

        const container = mapContainerRef.current.getBoundingClientRect();

        let delta = (e.deltaY)? e.deltaY : 1;

        delta = Math.max(-1,Math.min(1,delta))*-1; // cap the delta to [-1,1] for cross browser consistency
        delta = (e.deltaY) ? delta : 1;

        const zoomPoint = {
            x: e.clientX - container.left,
            y: e.clientY - container.top,
        }

        const zoomTotal = zoomMultiplier*zoomFactor;
        let currScale = (delta*zoomTotal) + scale;
        currScale = parseFloat(Math.max(1,Math.min(maxScale,currScale)).toFixed(1));

        const ratio = 1 - (currScale / scale);

        const pos = {
            x: current.x + (zoomPoint.x - current.x) * ratio,
            y: current.y + (zoomPoint.y - current.y) * ratio
        };

        setScale(currScale);
        setCurrent({
            x: pos.x,
            y: pos.y,
        })

        setOffset({
            x: current.x,
            y: current.y
        });
    };

    const dragStart = (e) => {
        e.preventDefault();

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
    const onDoubleClickEvent = (e) => {
        e.persist();
        console.log("double",e);
        wheelZoom(e, 4 )
    };

    const getMapLocation = (e) => {
        const {left, top} = mapRef.current.getBoundingClientRect();

        const pos = {
            x: (e.pageX - (left))/scale,
            y: (e.pageY - (top))/scale
        };

        console.log(pos.x, pos.y);

        setPointer({
            x: pos.x.toFixed(1),
            y: pos.y.toFixed(1)
        })
    };

    useEffect(() => {
        const {current} = mapContainerRef;
        current.addEventListener("wheel", wheelZoom);

        current.addEventListener("mousedown", dragStart);
        current.addEventListener("mouseup", dragEnd);
        current.addEventListener('mousemove', drag);
        current.addEventListener('mousemove', getMapLocation);

        return () => {
            current.removeEventListener("wheel", wheelZoom);

            current.removeEventListener("mousedown", dragStart);
            current.removeEventListener("mouseup", dragEnd);
            current.removeEventListener('mousemove', drag);
            current.removeEventListener('mousemove', getMapLocation);

        }
    });
    // useEffect(() => { if (scale === 1) resetMap() }, [scale]);

    return <Window name="MapWindow" type="window" width={width} height={height} id={id} onClick={onClick} active={active}>
        <div className="map-pointer-location">X:{pointer.x} Y:{pointer.y}</div>
        <div className="map-container"  ref={mapContainerRef} style={{height, width}}  onDoubleClick={onDoubleClickEvent}>
                    <MapPinLayer mapRef={mapRef} offset={offset} scale={scale} current={current}/>
                    <div className="map" >
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

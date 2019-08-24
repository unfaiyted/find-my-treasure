import React, {useState, useEffect, useRef} from 'react';
import Window from "./Window";
import MapPinLayer from "./MapPinLayer";

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

    const size = {
        w: 500,
        h: 500
    };

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
        // border: "1px solid red"
    };

    const wheelZoom = (e, zoomMultiplier = 1) => {
        e.preventDefault();

        console.log('multiplier',zoomMultiplier, e.deltaY);

        const container = mapContainerRef.current.getBoundingClientRect();


        let delta = (e.deltaY)? e.deltaY : 1;

        delta = Math.max(-1,Math.min(1,delta))*-1; // cap the delta to [-1,1] for cross browser consistency
        delta = (e.deltaY) ? delta : 1;


        console.log('event', e.pageX);

        const zoomPoint = {
            x: e.clientX - container.left,
            y: e.clientY - container.top,
        }

        //console.log(zoomPoint);

        // setZoomPoint(e.pageX = offset)
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
        console.log("double",e)
        wheelZoom(e, 4 )
    };

    useEffect(() => {
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

    useEffect(() => {
        if (scale === 1) {
            resetMap()
        }
    }, [scale]);

    return <Window name="MapWindow" type="window" width={width} height={height} id={id} onClick={onClick} active={active}>
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

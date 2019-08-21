import Pin from "./Pin";
import React, {useEffect, useState,useRef} from "react";


const MapPinLayer = (props) => {
    const {offset, mapRef, scale, children, current} = props;

    const mapInfoRef = useRef();
    const [style, setStyle] = useState({});
    const [lastScale, setLastScale] = useState(1);


    useEffect(() => {
        const currMap = mapRef.current.getBoundingClientRect();

        const currInfo = mapInfoRef.current.getBoundingClientRect();

        console.log(currMap, currInfo);

        const scaleDiff = parseFloat((scale-lastScale).toFixed(1));

        const scaleX = (current.x*scaleDiff);

        let  scaleMultipler= 1;

        if(scale !== lastScale) {
            scaleMultipler = 1.0
            console.log("multiplier")
        }

        const pos = {
            x: current.x * scaleMultipler,
            y: current.y * scaleMultipler
        }

        setStyle({
          //  top: currMap.top,
           // left: currMap.left,
            width: (currMap.width/scale),
            height: (currMap.height/scale),
            position: "absolute",
            overflow: "hidden",
            transform: `translate3d(${pos.x}px, ${pos.y}px ,0) scale(${scale})`
        });

        setLastScale(scale);
    }, [scale, current]);

    return (
        <div className="map-info-layer" style={style} ref={mapInfoRef}>
        <Pin locX={0} locY={115} offset={offset} scale={scale} map={mapRef}/>
            <Pin locX={0} locY={115} offset={offset} scale={scale} map={mapRef}/>
            <Pin locX={100} locY={125} offset={offset} scale={scale} map={mapRef}/>
            <Pin locX={0} locY={315} offset={offset} scale={scale} map={mapRef}/>

            {children}
        </div>)
}


export default MapPinLayer
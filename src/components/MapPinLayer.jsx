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
            width: (currMap.width/scale),
            height: (currMap.height/scale),
            position: "absolute",
            overflow: "hidden",
            transform: `translate3d(${pos.x}px, ${pos.y}px ,0) scale(${scale})`,
            transformOrigin: "0 0"
        });

        setLastScale(scale);
    }, [scale, current]);

    return (
        <div className="map-info-layer" style={style} ref={mapInfoRef}>
        <Pin loc={{x:0,y:116}} offset={offset} scale={scale} map={mapRef}/>
            <Pin icon="fate-icon" loc={{x:400,y:115}} offset={offset} scale={scale} map={mapRef}/>
            <Pin loc={{x:200,y:125}} offset={offset} scale={scale} map={mapRef}/>
            <Pin loc={{x:120,y:315}} offset={offset} scale={scale} map={mapRef}/>
            <Pin icon="x" loc={{x:300,y:315}} offset={offset} scale={scale} map={mapRef}/>
            {children}
        </div>)
}


export default MapPinLayer
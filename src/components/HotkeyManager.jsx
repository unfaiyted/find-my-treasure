import React, {useEffect}from 'react';
import {useStateValue} from "../AppContext";
import {useWindow} from "./hooks/use-window";


const HotkeyManager = () => {

    const { toggle } = useWindow("map");


    const keyPresses = (e => {
        if(e.code === "KeyM") {
            console.log("m pressed");
            toggle()
        }
    });

    useEffect(() => {
        document.addEventListener("keypress", keyPresses);
     return () => {
         document.removeEventListener("keypress", keyPresses);
     }
    });


  return null;
};


export default HotkeyManager;


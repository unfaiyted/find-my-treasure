import React, {useContext, useEffect, useState} from 'react';
import { useStateValue} from "../AppContext";
import {getPlayerData} from "../utils/actions";


const WindowManager = () => {

    const [{windows}, dispatch] = useStateValue();
    const [active, setActive] = useState(null);

    let openWindows = [];

    for(const key in windows) {
        // console.log(key);
        if(windows[key].isOpen) openWindows.push(windows[key]);
        if(windows[key].isActive) setActive(key);
    }

    const setActiveWindow = (id) => {
        // console.log(id)
        setActive(id)
    };


    const updatePlayerData = (e) => {
        dispatch(getPlayerData(e))
    }

    useEffect(() => {
        document.addEventListener('onPlayerChangedEvent', updatePlayerData);
        return () => {
            document.removeEventListener('onPlayerChangedEvent', updatePlayerData);
        }
    });


    return (
        <React.Fragment>
            {openWindows.length > 0 && openWindows.map((window)=> {
                return <window.component
                    key={window.id}
                    id={window.id}
                    active={((active === window.id))}
                    onClick={() => setActiveWindow(window.id)} />
            })}
        </React.Fragment>
    )
}


export default WindowManager;

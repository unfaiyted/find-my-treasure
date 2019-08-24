import React, {useContext, useEffect, useState} from 'react';
import { useStateValue} from "../AppContext";


const WindowManager = () => {

    const [{windows}] = useStateValue();
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

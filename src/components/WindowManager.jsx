import React, {useContext, useEffect} from 'react';
import { useStateValue} from "../AppContext";


const WindowManager = () => {

    const [{windows}] = useStateValue()

    let openWindows = [];

    for(const key in windows) {
        console.log(key);
        if(windows[key].isOpen) openWindows.push(windows[key]);
    }


    return (
        <React.Fragment>
            {openWindows.length > 0 && openWindows.map((window)=> {
                return <window.component key={window.id} id={window.id}/>
            })}
        </React.Fragment>
    )
}


export default WindowManager;

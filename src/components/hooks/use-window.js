import React, {useContext, useState} from 'react';
import { useStateValue} from "../../AppContext";


export const useWindow = (window) => {
    const [{windows}, dispatch] = useStateValue();
    const [windowPos, setWindowPos] = useState(null);

    const active = windows[window];

    for (let i =0; i < windows.length; i++) {
        if(windows[i].id === window && windowPos !== i) setWindowPos(i);
    }

    return {
        window: active,
        toggle: () => {
            dispatch({
                type: 'toggleWindow',
                id: active.id,
                isOpen: !active.isOpen
            })
        },
        open: () => {
            dispatch({
                type: 'toggleWindow',
                id: active.id,
                isOpen: true,
                isActive: true
            })
        },
        close: () => {
            dispatch({
                type: 'toggleWindow',
                id: active.id,
                isOpen: active.isOpen
            })
        }
    }
};



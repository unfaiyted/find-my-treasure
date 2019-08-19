import React, {useContext} from "react";
import {EXPANSIONS, ZONE} from "../utils/constants";
import "../css/menu-group-list.scss"
import { useStateValue} from "../AppContext";
import {useWindow} from "./useWindow";

const MenuGroupList = (props) => {
    const {group} = props;
    const  [{chosenLocation}, dispatch] = useStateValue();

    const { open, close } = useWindow("menuMapFinder");

    const displayedZones = ZONE.filter((z) => (z.expansion === group || group === "All" ));

    displayedZones.sort((a,b) => (a.expansion > b.expansion)? 1: -1);

   let expansionName;

   const toggleLocation = (e) => {
       close();
        dispatch({
            type: 'changeLocation',
            location: e.target.innerHTML
        });
        open();
   };

    return (
        <div className="menu-group-list">
            {displayedZones.map((loc,i) => {
                let displayExp = false;
                if(expansionName !== loc.expansion) {
                    expansionName=loc.expansion;
                    displayExp = true;
                }
                return (
                    <div key={i}>
                        {(displayExp) && <div className="expansion">{EXPANSIONS[loc.expansion]}</div>}
                        <div className="location">
                            <img src="./aetheryte.png"/>
                        <div className="name" onClick={toggleLocation}>{loc.name}</div>
                        </div>
                    </div>
                        )
            })}
        </div>
    )

};


export default MenuGroupList;

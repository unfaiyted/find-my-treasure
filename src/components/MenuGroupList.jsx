import React, {useContext} from "react";
import {ZONE} from "../utils/constants";
import "../css/menu-group-list.scss"
import {AppContext} from "../AppContext";

const MenuGroupList = (props) => {
    const {group} = props;



    const displayedZones = ZONE.filter((z) => (z.expansion === group || group === "All" ));

    displayedZones.sort((a,b) => (a.expansion > b.expansion)? 1: -1);

   let expansionName;

   const toggleLocation = (e) => {
       console.log(e.target.innerHTML);

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
                        {(displayExp) && <div className="expansion">{loc.expansion}</div>}
                        <div className="name" onClick={toggleLocation}>{loc.name}</div>
                    </div>
                        )
            })}
        </div>
    )

};


export default MenuGroupList;

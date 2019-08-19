import React, {useState} from 'react';
import "../css/map-selector.scss"


const MapSelector = (props) => {
    const [offset, setOffSet] = useState(0);
    const [selected, setSelected] = useState(1);

    const baseNumbers = [1,2,3,4,5,6,7,8,9,10];
    const numbers = baseNumbers.filter((num)=>(num<=offset+5&&num>=offset+1));

    const addOffset = () => {
        if(offset <= baseNumbers.length-6) setOffSet(offset+5);
    };

    const subOffset = () => {
        if (offset>=5) setOffSet(offset-5);
    };

    const tagLeft = (offset>=5) ? 'active' : "inactive";
    const tagRight = (offset <= baseNumbers.length-6)? 'active' : "inactive";

    const selectItem = (e) => {
        const id = e.target.innerText;
        setSelected(id);
        props.selected(id);
    }


  return <div className="map-selector">
              <div className={["left-arrow", tagLeft].join(" ")} onClick={subOffset}>
                  <img src="./arrow-btn.png"/>
              </div>
                  {numbers.map((num)=> {
                      const selectClass = (num==selected) ? "selected" : 'not-selected';
                    return   <div className={["item",selectClass].join(" ")} onClick={selectItem}>{num}</div>}
                  )}

              <div className={["right-arrow", tagRight].join(" ")} onClick={addOffset}>
                  <img src="./arrow-btn.png"/>
              </div>
         </div>
};

export default MapSelector;

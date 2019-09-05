import React, {useState} from 'react';
import PropTypes from "prop-types";
import "../../css/menu.scss";
import LocationList from "../ui/LocationList";
import Window from "../Window"


const ActionsMenu = (props) => {

    const { onClick, id, active } = props;

    const [activeGroup, setGroup] = useState("All");

    return <Window name="Actions" onClick={onClick} width={300} height={300} id={id} active={active}>
        <hr/>

        <div className="menu-selected-group">
        </div>
    </Window>
};

ActionsMenu.propTypes =  {
    onClick: PropTypes.func,
};


export default ActionsMenu;

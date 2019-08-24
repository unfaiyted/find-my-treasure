import React from 'react';
import PropTypes from "prop-types";
import "../css/menu-header-item.scss"

const MenuHeaderItem = (props) => {
    const {text, onClick, activeGroup} = props;

    const active = (activeGroup === text) ? 'active' : 'inactive';

    return (
        <div className={["menu-header-select", active].join(" ")} onClick={onClick}>
            {text}
        </div>)
};


export default MenuHeaderItem;

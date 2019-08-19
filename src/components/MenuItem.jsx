import React from 'react';
import PropTypes from "prop-types";
import "../css/menu-item.scss"

const MenuItem = (props) => {
    const {text, onClick, activeGroup} = props;

    const active = (activeGroup === text) ? 'active' : 'inactive';

    return (
        <div className={["menu-item-select", active].join(" ")} onClick={onClick}>
            {text}
        </div>)
};


export default MenuItem;

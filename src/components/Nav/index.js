import React from 'react';
import '../index.css';

const NavComponent = props => {

    return (
        <div id="nav">
        <a href="/#"><img id="profilePicture" src={props.picture} alt="profilePicture" /></a>
        <div id="nick">{props.nickName}</div>
        </div>
    )
}

export default NavComponent;


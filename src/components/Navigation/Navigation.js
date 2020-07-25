import React from "react";
import './Navigation.css';

const Navigation = props => {
    return (
        <nav>
            {props.children}
            <p className='f3 link dim black underline pa3 pointer mt4'>Sign out</p>
        </nav>
    )
};

export default Navigation;
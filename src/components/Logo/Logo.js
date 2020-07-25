import React from "react";
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt4'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                    <img src={brain} alt='logo' width='120px' height='120px' style={{paddingTop: '15px'}} />
                </div>
            </Tilt>
        </div>
    )
};

export default Logo;
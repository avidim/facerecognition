import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageUrl} style={{maxWidth: '700px'}} height='auto' alt=''/>
                <div className='bounding-box' style={{top: box.top, right: box.right, bottom: box.bottom, left: box.left}}>

                </div>
            </div>
        </div>
    )
};

export default FaceRecognition;
import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This magic brain will detect faces in your pictures. Give it a try :)'}
            </p>
            <p className='f4'>
                {'P.S The image link have to end at image extension like: '}
                <span className="red">{'https://1vw4gb3u6ymm1ev2sp2nlcxf-wpengine.netdna-ssl.com/wp-content/uploads/shutterstock_149962697-946x658.jpg'}</span>
            </p>
            <div>
                <div className='pa4 br3 shadow-5 form center'>
                    <input className='f4 pa2 w-70 center br1 bw0' type="text" onChange={ onInputChange }/>
                    <button className='w-30 grow f4 link ph3 pv2 bw0 br1 white bg-light-purple' onClick={ onButtonSubmit }>Detect</button>
                </div>
            </div>
        </div>
    )
};

export default ImageLinkForm;
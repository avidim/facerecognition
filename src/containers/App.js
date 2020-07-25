import React from 'react';
import './App.css';
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import Rank from "../components/Rank/Rank";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '1d12be889655455fabd9c12f42ff3e3a'
});

const particlesOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {}
        }
    };

    calculateFaceLocation = data => {
        const faceBoundaries = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);

        this.setState({ box: {
                top: faceBoundaries.top_row * height,
                right: width - (faceBoundaries.right_col * width),
                bottom: height - (faceBoundaries.bottom_row * height),
                left: faceBoundaries.left_col * height,
            } });
    };

    onInputChange = event => {
        this.setState({ input: event.target.value });
    };

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input }, () => {
            app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.imageUrl)
                .then(response => this.calculateFaceLocation(response))
                .catch(error => console.log(error));
        });
    };

    render() {
        return (
            <div className="App">
                <Particles
                    className='particles'
                    params={ particlesOptions }
                />
                <Navigation>
                    <Logo />
                </Navigation>
                <Rank />
                <ImageLinkForm
                    onInputChange={ this.onInputChange }
                    onButtonSubmit={ this.onButtonSubmit }
                />
                <FaceRecognition
                    imageUrl={ this.state.imageUrl }
                    box={ this.state.box }
                />
            </div>
        )
    };
}

export default App;

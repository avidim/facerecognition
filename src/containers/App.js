import React from 'react';
import './App.css';
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import Rank from "../components/Rank/Rank";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import Particles from 'react-particles-js';

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

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signIn',
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: new Date()
    }
};

class App extends React.Component {
    constructor() {
        super();
        this.state = initialState;
    };

    loadUser = data => {
        this.setState({ user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        });
    };

    calculateFaceLocation = data => {
        const faceBoundaries = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return(
                {
                    top: faceBoundaries.top_row * height,
                    right: width - (faceBoundaries.right_col * width),
                    bottom: height - (faceBoundaries.bottom_row * height),
                    left: faceBoundaries.left_col * width,
                }
            );
    };

    displayFaceBox = box => {
        this.setState({ box: box })
    };

    onInputChange = event => {
        this.setState({ input: event.target.value });
    };

    onButtonSubmit = () => {
            this.setState({ imageUrl: this.state.input }, () => {
                fetch('https://smartbrain-api.avidim.dev/imageurl', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageUrl: this.state.imageUrl })
                })
                    .then(response => response.json())
                    .then(response => {
                        if (response) {
                            fetch('https://smartbrain-api.avidim.dev/image', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: this.state.user.id })
                            })
                                .then(response => response.json())
                                .then(count => this.setState(Object.assign(this.state.user,
                                    {entries: count})))
                                .catch(err => console.log(err))
                        }
                        this.displayFaceBox(this.calculateFaceLocation(response));
                    })
                    .catch(error => console.log(error));
        });
    };

    onSignOut = () => {
        this.setState(initialState);
        this.onRouteChange('signIn');
    };

    onRouteChange = route => {
        this.setState({ route: route });
    };

    render() {
        return (
            <div className="App">
                <Particles
                    className='particles'
                    params={ particlesOptions }
                />
                <Navigation onRouteChange ={ this.onRouteChange } routeState={ this.state.route } onSignOut={this.onSignOut}>
                    <Logo />
                </Navigation>
                {
                    this.state.route === 'home' ?
                        <div>
                            <Rank name={ this.state.user.name } entries={ this.state.user.entries } />
                            <ImageLinkForm
                                onInputChange={ this.onInputChange }
                                onButtonSubmit={ this.onButtonSubmit }
                            />
                            <FaceRecognition
                                imageUrl={ this.state.imageUrl }
                                box={ this.state.box }
                            />
                        </div>
                        : ( this.state.route === 'signIn'
                            ? <SignIn onRouteChange={ this.onRouteChange } loadUser={ this.loadUser } />
                            : <SignUp onRouteChange={ this.onRouteChange } />
                        )
                }
            </div>
        )
    };
}

export default App;
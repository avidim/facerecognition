import React from "react";
import './Navigation.css';

const Navigation = props => {
    const routeStatePtag = props.routeState === 'signIn' ? 'Sign Up' : 'Sign In';
    const routeStateEvent = props.routeState === 'signIn' ? 'signUp' : 'signIn';
    return (
        <nav>
            {props.children}
            <p
                onClick={ () => props.onRouteChange(routeStateEvent) }
                className='f3 link dim black underline pa3 pointer'
                style={{lineHeight: '80px'}}
            >
                { routeStatePtag }
            </p>
        </nav>
    )
};

export default Navigation;
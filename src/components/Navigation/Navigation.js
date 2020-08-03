import React from "react";
import './Navigation.css';

const Navigation = props => {
    let routeStatePtag;
    if (props.routeState === 'home')
        routeStatePtag = 'Sign Out';
    else if (props.routeState === 'signIn')
        routeStatePtag = 'Sign Up';
    else
        routeStatePtag = 'Sign In';
    const routeStateEvent = props.routeState === 'signIn' ? 'signUp' : 'signIn';
    return (
        <nav>
            {props.children}
            <p
                onClick={
                    props.routeState === 'home'
                        ?   () => props.onSignOut()
                        :   () => props.onRouteChange(routeStateEvent)
                }
                className='f3 link dim black underline pa3 pointer'
                style={{lineHeight: '80px'}}
            >
                { routeStatePtag }
            </p>
        </nav>
    )
};

export default Navigation;
import React from "react";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpName: '',
            signUpEmail: '',
            signUpPassword: ''
        }
    }

    userName = event => {
        this.setState({ signUpName: event.target.value })
    };

    userEmail = event => {
        this.setState({ signUpEmail: event.target.value })
    };

    userPassword = event => {
        this.setState({ signUpPassword: event.target.value })
    };

    onSubmit = () => {
        if (!this.state.signUpName || !this.state.signUpEmail || !this.state.signUpPassword)
            return alert('Enter name, email and password!');
        fetch('https://smartbrain-api.avidim.dev/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.signUpName,
                email: this.state.signUpEmail,
                password: this.state.signUpPassword
            })
        })
            .then(response => response)
            .then(data => {
                if (data.status === 200) {
                    this.props.onRouteChange('signIn');
                } else {
                    alert('Something get wrong. Try again!');
                }
            })
    };

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="text" name="name" id="name"
                                       onChange={ this.userName }
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address"
                                       onChange={ this.userEmail }
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password"
                                       onChange={ this.userPassword }
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit" value="Sign Up"
                                onClick={ this.onSubmit }
                            />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default SignUp;
import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
// import {ToastProvider,useToasts } from 'react-toast-notifications';
import { WaveLoading } from 'react-loadingg';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            pageLoadingAnimation: false

        }

    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;
        this.setState({ pageLoadingAnimation: true })
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' })
        } catch (error) {
            console.log(error);
            this.setState({ pageLoadingAnimation: false });
            alert("You have entered invalid Login credentials");

        }

    }
    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }
    render() {

        const pageLoadingAnimationStyle = {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.7)',
            top: '0px',
            position: 'absolute'
        }
        return (

            <div className='sign-in'>

                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        handleChange={this.handleChange}
                        value={this.state.email}
                        label='Email'
                        required
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <div className="buttons">
                        <CustomButton type='submit'>Sign In</CustomButton>
                        {this.state.pageLoadingAnimation ?
                            <div style={pageLoadingAnimationStyle}>
                                <WaveLoading color='black' size='small'
                                    style={{
                                        position: 'fixed',
                                        display: 'flex',
                                        margin: 'auto',
                                        padding: '0px',
                                        top: '0px',
                                        left: '0px',
                                        right: '0px',
                                        bottom: '0px'
                                    }} />
                            </div> :
                            null
                        }


                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>

                </form>

            </div>

        )
    }
}
export default SignIn;
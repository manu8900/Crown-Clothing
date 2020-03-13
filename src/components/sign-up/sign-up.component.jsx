import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component'
import { WaveLoading } from 'react-loadingg';
import {auth,createUserProfileDocument} from '../../firebase/firebase.utils'

import './sign-up.styles.scss'

class SignUp extends React.Component{
    constructor(){
        super();
        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:'',
            pageLoadingAnimation: false
        }
    }
    handleSubmit = async event =>{
        event.preventDefault();
        const{displayName,email,password,confirmPassword}=this.state;
        if(password !== confirmPassword){
            alert("passwords don't match");
            return;
        }
        try{
        const {user}=await auth.createUserWithEmailAndPassword(email,password)
        this.setState({pageLoadingAnimation:true})
        await createUserProfileDocument(user,{displayName});
       
         this.setState({
             displayName:'',
             email:'',
             password:'',
             confirmPassword:'',
             
         })
        }catch(error){
           console.log(error);
           this.setState({pageLoadingAnimation:false})
           alert("Signup Failed");
        }
}
handleChange = event =>{
    const {name,value}= event.target;
    this.setState({[name]:value});
}

    render(){
        const pageLoadingAnimationStyle = {
            width: '100%',
            height: '100%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: 'rgba(255,255,255,0.7)',
            top: '0px',
            position: 'absolute'
        }
        const{displayName,email,password,confirmPassword}=this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form  className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={this.handleChange}
                    label='Enter Name'
                    required/>
                       <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    label='Email'
                    required/>
                       <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                    label='Password'
                    required/>
                       <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label='Confirm Password'
                    required/>
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                    {this.state.pageLoadingAnimation ?
                            <div style={pageLoadingAnimationStyle}>
                                <WaveLoading color='black' size='small' style={{position:'fixed',display:'flex', margin: 'auto', padding: '0px', top: '0px', left: '0px', right: '0px', bottom: '0px' }} />
                            </div> :
                            null
                        }
                </form>
            </div>
        )
    }
}
export default SignUp;
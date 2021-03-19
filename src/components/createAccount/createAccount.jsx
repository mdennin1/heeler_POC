import React, { useEffect, useReducer } from 'react';
import FormInput from '../../components/formInput/formInput';
import Btn from '../../components/btn/btn';
import {auth, createUserProfileDocument } from '../../firebase/firebase';
import ACTIONS from '../../constants/actions';
import './createAccount.scss';

const reducer = (state, action) =>{
    const type = action.type;
    switch(type){
        // case ACTIONS.SET_USERNAME:
        case ACTIONS.SET_DISPLAYNAME:
        case ACTIONS.SET_EMAIL:
        case ACTIONS.SET_PASSWORD:
        case ACTIONS.CONFIRM_PASSWORD:
            return state = {...state, [action.type]: action.payload};
        case ACTIONS.SIGN_UP:
            return state = {};
        default: 
            console.log(`action: ${JSON.stringify(action)}`);
            break;
    }
}

export default function CreateAccount() {
    const [state, dispatch] = useReducer(reducer, {});
    useEffect(()=>{
        console.log(`state: ${JSON.stringify(state)}`);
    });
    const handleSignUp = async event =>{
        event.preventDefault();
        if(state.password === state.confirmPassword) {
            try{
                const { user } = await auth.createUserWithEmailAndPassword(state.email, state.password);
                // console.log(user);
                const {displayName} = state;
                await createUserProfileDocument(user, {displayName});
                dispatch({type: ACTIONS.SIGNUP});
            } catch(error){
                console.error(JSON.stringify(error));
            }
        }else{
            alert('%cpassword values do not match', 'color:red;');
        }
    }
    //render
    return (
        <div className="sign-up">
            <div className='sign-up-content'>
                <h2 className="title">
                    I do not have an account
                </h2>
                <span>
                    sign up with your email and password
                </span>
                <form className='sign-up-form' onSubmit={async event=>handleSignUp(event)}>
                    <FormInput type='text' label='Display Name' name='displayName' value={state.displayName} required dispatch={dispatch} />
                    <FormInput type='email' label='Email' name='email' value={state.email} required dispatch={dispatch} />
                    <FormInput type='password' label='Password' name='password' value={state.password} required dispatch={dispatch} />
                    <FormInput type='password' label='Confirm Password' name='confirmPassword' value={state.confirmPassword} required dispatch={dispatch} />
                    <div className='buttons'>
                        <Btn type='submit'>Submit</Btn>
                    </div>
                </form>
            </div>
        </div>
    )
}
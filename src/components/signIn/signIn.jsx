import React, { useEffect, useReducer } from 'react';
import { signInWithGoogle } from '../../firebase/firebase';
import ACTIONS from '../../constants/actions.js';
import Btn from '../../components/btn/btn';
import FormInput from '../../components/formInput/formInput';
//
const reducer = (state, action) => {
    console.log(`action: ${JSON.stringify(action)}`);
    switch (action.type){
        case ACTIONS.username:
        case ACTIONS.password:
            return state = {...state, [action.type]: action.payload};
        default:
            break;
    }
}
const SignIn = (props) => {
    const [state, dispatch] = useReducer(reducer, {});
    useEffect(()=>{
        console.log(`%cprops: ${JSON.stringify(props)}, state: ${JSON.stringify(state)}`, 'color:red;');
    }, [state]);
    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>{`Sign in with email & password`}</span>
            <form>
                <FormInput label='Email' name={ACTIONS.username} type='email' value={state.username} dispatch={dispatch} />
                <FormInput label="Password" name='password' type='password' value={state.password} dispatch={dispatch} />
                <div className="buttons">
                    <Btn type='submit'>Sign In</Btn>
                    <Btn onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</Btn>
                </div>
            </form>
        </div>
    )
}
export default SignIn;
import React, { useEffect, useReducer } from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase';
import ACTIONS from '../../constants/actions.js';
import Btn from '../../components/btn/btn';
import FormInput from '../../components/formInput/formInput';
import './signIn.scss';
//recoil
import { useRecoilState } from 'recoil';
import { loginState } from '../../recoil/atoms/loginState';
//


const reducer = (state, action) => {
    switch (action.type){
        case ACTIONS.SET_EMAIL:
        case ACTIONS.SET_PASSWORD:
            return state = {...state, [action.type]: action.payload};
        // case ACTIONS.SIGN_IN:
        //     return state = {};
        default:
            break;
    }
}
const SignIn = (props) => {
    const [state, dispatch] = useReducer(reducer, {});
    const [ userInfo, setUserInfo] = useRecoilState(loginState);
    useEffect(()=>{
        console.log(`%cuserInfo: ${JSON.stringify(userInfo)}, state: ${JSON.stringify(state)}`, 'color:blue;');
    }, [userInfo]);
    //
    const handleSignIn = async (event) =>{
        console.log(`%chandleSignIn fired`, 'color:green');
        event.preventDefault();
        try{
            const user = await auth.signInWithEmailAndPassword(state.email, state.password);
            console.log(`%cuser: ${JSON.stringify(user)}`, 'font-size:large; color: green');
            setUserInfo(user); 
            // dispatch({type: ACTIONS.signIn});  
        }catch(error){
            console.error(error);
        }
    }
    //render
    return (
        <div className='sign-in'>
            <div className='sign-in-content'>
                <h2>I already have an account</h2>
                <span>{`Sign in with username & password`}</span>
                <form onSubmit={event=>handleSignIn(event)}>
                    {/* <FormInput label='Username' name='username' type='text' value={state.username} dispatch={dispatch} /> */}
                    <FormInput label='Email' name='email' type='email' value={state.email} dispatch={dispatch} />
                    <FormInput label="Password" name='password' type='password' value={state.password} dispatch={dispatch} />
                    <div className="buttons">
                        <Btn type='submit'>Sign In</Btn>
                        <Btn onClick={signInWithGoogle} isGoogleSignIn>Google Sign In</Btn>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SignIn;
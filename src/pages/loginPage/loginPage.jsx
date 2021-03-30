import React, { useState } from 'react';
import CreateAccount from '../../components/createAccount/createAccount';
import SignIn from '../../components/signIn/signIn';
import Btn from '../../components/btn/btn';
import './loginPage.scss';
//recoil
import { useRecoilState } from 'recoil';
import { loginState } from '../../recoil/atoms/loginState';

const LoginPage = () =>{
    const [showLogin, setLogin] = useState(false);
    const [showSignUp, setSignUp] = useState(false);
    //
    return (
        <div className="login-container">
            <div className='login-option'>
                {
                    showLogin ? (<SignIn />) : (<Btn onClick={()=>setLogin(true)}>Sign In</Btn>)
                }
            </div>
            <div className='login-option'>
                {
                    showSignUp ? (<CreateAccount />) : (<Btn onClick={()=>setSignUp(true)}>Create an Account</Btn>)
                }
            </div>
            {/* <SignIn className="login-option" />
            <CreateAccount className="login-option"/> */}
        </div>
    )
}
//
export default LoginPage;
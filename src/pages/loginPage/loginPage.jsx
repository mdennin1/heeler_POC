import React from 'react';
import CreateAccount from '../../components/createAccount/createAccount';
import SignIn from '../../components/signIn/signIn';

export default function loginPage() {
    return (
        <div className='login-container'>
            <SignIn className="login-option" />
            <CreateAccount className="login-option"/>
        </div>
    )
}

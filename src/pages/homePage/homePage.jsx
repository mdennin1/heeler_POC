import React from 'react';
import { ReactComponent as Logo } from '../../assets/Logo_1.svg';

export default function homePage() {
    return (
        <div className='home-page-container'>
            <Logo className='background-logo' />
        </div>
    )
}
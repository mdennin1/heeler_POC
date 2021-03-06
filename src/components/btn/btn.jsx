import React from 'react'
import './btn.scss';
export default function Btn({children, isGoogleSignIn, ...props}) {
    return (
        <button className={isGoogleSignIn ? `google-sign-in custom-button` : `custom-button`} {...props}>{children}</button>
    )
}

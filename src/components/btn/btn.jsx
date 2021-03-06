import React from 'react'
import './btn.scss';
export default function Btn({children, ...props}) {
    return (
        <button className={props.isGoogleSignIn ? `google-sign-in custom-button` : `custom-button`} {...props}>{children}</button>
    )
}

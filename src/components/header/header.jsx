import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import { ReactComponent as Logo } from  '../../assets/Logo_blackText_v3.svg';
import NAV_OPTIONS from '../../constants/navOptions';
import { auth } from '../../firebase/firebase';
//recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfo } from '../../recoil/selectors/loginSelectors';
const Header = () => {
    const user = useRecoilValue(userInfo);
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo"/>
            </Link>
            <div className="options">
                {
                    NAV_OPTIONS.map(nav=>{
                        const regex = /_/;
                        if(nav === 'login' && user){
                            return(
                                <div key={nav} className="option" onClick={()=>auth.signOut()}>
                                    SIGN OUT
                                </div>
                            )
                        }
                        return(
                            <Link key={nav} className="option" to={ nav === 'home' ? `/` : `/${nav}`}>
                                {nav?.toString().toUpperCase().replace(regex, ' ')}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Header;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import { ReactComponent as Logo } from  '../../assets/Logo_blackText_v3.svg';
import NAV_OPTIONS from '../../constants/navOptions';
import { auth } from '../../firebase/firebase';
//recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfo } from '../../recoil/selectors/loginSelectors';
import { showMyPetsDropdownState } from '../../recoil/atoms/myPets';
//components
import MyPetsDropdown from '../myPetsDropdown/myPetsDropdown';

const Header = () => {
    const user = useRecoilValue(userInfo);
    const [showMyPetsDropdown, setMyPetsDropdown] = useRecoilState(showMyPetsDropdownState);
    const toggleMyPetsDropdown = () => {
        console.log(`toggle dropdown`);
        setMyPetsDropdown(!showMyPetsDropdown);
    }
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
                        if(nav === 'my_pets'){
                            return(
                                <div key={nav} className="option" onClick={()=>toggleMyPetsDropdown()}>
                                    {
                                        nav?.toString().toUpperCase().replace(regex, ' ')
                                    }
                                </div>
                            );
                        }
                        return(
                            <Link key={nav} className="option" to={ nav === 'home' ? `/` : `/${nav}`}>
                                {nav?.toString().toUpperCase().replace(regex, ' ')}
                            </Link>
                        )
                    })
                }
            </div>
            {
                showMyPetsDropdown ? (<MyPetsDropdown />) : null
            }
        </div>
    )
}

export default Header;
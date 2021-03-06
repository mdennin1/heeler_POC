import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import { ReactComponent as Logo } from  '../../assets/Logo_1.svg';
import NAV_OPTIONS from '../../constants/navOptions';
const Header = props => {
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo"/>
            </Link>
            <div className="options">
                {
                    NAV_OPTIONS.map(nav=>{
                        const regex = /_/;
                        // if(nav === 'login' && props.currentUser){
                        //     return(
                        //         <div key={nav} className="option" onClick={()=>auth.signOut()}>
                        //             Sign Out
                        //         </div>
                        //     )
                        // }
                        return(
                            <Link key={nav} className="option" to={`/${nav}`}>
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
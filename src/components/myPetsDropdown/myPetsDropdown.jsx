import React from 'react';
import './myPetsDropdown.scss';
import Btn from '../../components/btn/btn';
//
const MyPetsDropdown = (history) =>{
    return (
        <div className='dropdown-container'>
            dropdown
            <Btn className='add-pet-btn'>Add a Pet</Btn>
        </div>
    )
}
//
export default MyPetsDropdown;
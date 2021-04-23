import React, {useEffect} from 'react';
import './homePage.scss';
import {firestore} from '../../firebase/firebase';
//recoil
import { useRecoilValue } from 'recoil';
import { selectedPetState } from '../../recoil/atoms/myPets';
import { loginState } from '../../recoil/atoms/loginState';
//components
import PetInfoCard from '../../components/petInfoCard/petInfoCard';
//
const HomePage =() => {
    const selectedPet = useRecoilValue(selectedPetState);
    const userInfo = useRecoilValue(loginState);
    useEffect(()=>console.log(`%cuserInfo: ${JSON.stringify(userInfo)}`, 'color:blue;'));
    return (
        <div className='home-page'>
            <div className='home-page-container'>
                <PetInfoCard pet={selectedPet}/>
            </div>
        </div>
    )
}
//
export default HomePage;
import React, {useEffect} from 'react';
import './petSelector.scss';
import {firestore} from '../../firebase/firebase';
// state imports
import {useRecoilState, useRecoilValue} from 'recoil';
import { myPetsState, selectedPetState } from '../../recoil/atoms/myPets';
// import { userInfo } from '../../recoil/selectors/loginSelectors';
//components
import PetInfoCard from '../petInfoCard/petInfoCard';
import { loginState } from '../../recoil/atoms/loginState';
//
const PetSelector = () =>{
    // const myPets = useRecoilValue(myPetsState);
    // const [myPets, setMyPets] = useRecoilState(myPetsState);
    // const selectedPetId = useRecoilState(selectedPetIdState);
    const myPets = useRecoilValue(myPetsState);
    const [selectedPet, setSelectedPet] = useRecoilState(selectedPetState);
    const userInfo = useRecoilValue(loginState);

    useEffect(()=>{
        console.log(`hi from petSelector`);
        firestore.collection('pets').where('owner', '==', userInfo.id).onSnapshot(snapshot =>{
            console.log(`%csnapshot: ${snapshot?.data()}`, 'color:green;');
        });
    });
    return(
        { 
            userInfo?.id ? 
            (<div className='selector-container'>
                <div className='selector-arrow-button'>
                    <button onClick={e=>{
                        e.preventDefault();
                        console.log('left clicked');
                    }}>back icon placeholder</button>
                </div>
                <div className='pet-card-display'>
                    <PetInfoCard />
                </div>
                <div className='selector-arrow-button'>
                    <button onClick={e=>{
                        e.preventDefault();
                        console.log('right clicked');
                    }}>next icon placeholder</button>
                </div>
            </div>) : (<div>please sign in to see your pets</div>)
        }
    );
}
export default PetSelector;
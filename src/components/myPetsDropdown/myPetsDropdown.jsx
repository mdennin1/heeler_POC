import React, {useEffect} from 'react';
import './myPetsDropdown.scss';
import Btn from '../../components/btn/btn';
import PetSelectorOption from '../../components/petSelectorOption/petSelectorOption';
//
import {useRecoilState, useRecoilValue} from 'recoil';
import {showAddPetState, myPetsState, selectedPetState} from '../../recoil/atoms/myPets';
import {myPetsIdsSelector} from '../../recoil/selectors/petSelectors';
//components
import Modal from '../../components/modal/modal';
import AddPetForm from '../../components/addPetForm/addPetForm';
//
const MyPetsDropdown = (history) =>{
    const [showAddPet, setShowAddPet] = useRecoilState(showAddPetState);
    const [selectedPet, setSelectedPet] = useRecoilState(selectedPetState);
    const myPets = useRecoilValue(myPetsState);
    const petIds = useRecoilValue(myPetsIdsSelector);
    const handlePetSelect = event => {
        const petId = event.target.petId;
        console.log(petId);
        const selected_pet = myPets[petId];
        setSelectedPet({...selected_pet});
    }
    useEffect(()=>{
        console.log(showAddPet);
        console.log(`selectedPet from pet dropdown: ${JSON.stringify(selectedPet)}`, 'color:purple;');
    },[showAddPet])
    return (
        <div className='dropdown-container'>
            { 
                petIds?.map(petId =><PetSelectorOption key={petId} pet={myPets[petId]} onClick={e=>handlePetSelect} />)
            }
            <Btn className='add-pet-btn' onClick={()=>setShowAddPet(!showAddPet)}>Add a Pet</Btn>
            {
                showAddPet ? (<Modal showModal={showAddPet} setShowModal={setShowAddPet}><AddPetForm /></Modal>) : null
            }
        </div>
    )
}
//
export default MyPetsDropdown;
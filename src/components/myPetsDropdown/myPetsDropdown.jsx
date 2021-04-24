import React, {useEffect} from 'react';
import './myPetsDropdown.scss';
import Btn from '../../components/btn/btn';
import PetSelectorOption from '../../components/petSelectorOption/petSelectorOption';
//
import {useRecoilState, useRecoilValue} from 'recoil';
import {showAddPetState, myPetsState, selectedPetState} from '../../recoil/atoms/myPets';
import {myPetsListSelector} from '../../recoil/selectors/petSelectors';
//components
import Modal from '../../components/modal/modal';
import AddPetForm from '../../components/addPetForm/addPetForm';
//
const MyPetsDropdown = (history) =>{
    const [showAddPet, setShowAddPet] = useRecoilState(showAddPetState);
    const [selectedPet, setSelectedPet] = useRecoilState(selectedPetState);
    const myPets = useRecoilValue(myPetsState);
    const myPetsList = useRecoilValue(myPetsListSelector);
    const handlePetSelect = event => {
        const petId = event.target.id;
        console.log(`petId: ${petId}`, 'color:red;');
        const selected_pet = myPets[petId];
        setSelectedPet({...selected_pet});
    }
    useEffect(()=>{
        console.log(showAddPet);
        console.log(`%cselectedPet from pet dropdown: ${JSON.stringify(selectedPet)}`, 'color:purple;');
    },[showAddPet, selectedPet])
    return (
        <div className='dropdown-container'>
            {
                myPetsList ? myPetsList?.map(pet => <PetSelectorOption key={pet.id} id={pet.id} pet={pet} onClick={e=>{
                    const petId = e.target.id;
                    console.error(petId);
                    e.preventDefault();
                    const selection = myPets[petId];
                    setSelectedPet(selection);
                }} />) : null
            }
            <Btn className='add-pet-btn' onClick={()=>setShowAddPet(!showAddPet)}>Add a Pet</Btn>
            {
                showAddPet ? (<Modal showModal={showAddPet} setShowModal={setShowAddPet}><AddPetForm pet={selectedPet} /></Modal>) : null
            }
        </div>
    );
}
//
export default MyPetsDropdown;
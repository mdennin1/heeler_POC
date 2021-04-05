import React, {useEffect} from 'react';
import './myPetsDropdown.scss';
import Btn from '../../components/btn/btn';
import {useRecoilState} from 'recoil';
import {showAddPetState} from '../../recoil/atoms/myPets';
//components
import Modal from '../../components/modal/modal';
import AddPetForm from '../../components/addPetForm/addPetForm';
//
const MyPetsDropdown = (history) =>{
    const [showAddPet, setShowAddPet] = useRecoilState(showAddPetState);
    useEffect(()=>{
        console.log(showAddPet);
    },[showAddPet])
    return (
        <div className='dropdown-container'>
            dropdown
            <Btn className='add-pet-btn' onClick={()=>setShowAddPet(!showAddPet)}>Add a Pet</Btn>
            {
                showAddPet ? (<Modal showModal={showAddPet} setShowModal={setShowAddPet}><AddPetForm /></Modal>) : null
            }
        </div>
    )
}
//
export default MyPetsDropdown;
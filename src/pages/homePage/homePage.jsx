import React, {useEffect} from 'react';
import './homePage.scss';
import {firestore} from '../../firebase/firebase';
//recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {myPetsState, selectedPetState} from '../../recoil/atoms/myPets';
// import {userInfo} from '../../recoil/selectors/loginSelectors';
import {loginState} from '../../recoil/atoms/loginState';
//components
import PetInfoCard from '../../components/petInfoCard/petInfoCard';
//
const HomePage =() => {
    const [myPets, setMyPets] = useRecoilState(myPetsState);
    const [selectedPet, setSelectedPet] = useRecoilState(selectedPetState);
    const userInfo = useRecoilValue(loginState);
    const loadPets = userInfo => {
        // console.log(`loadPets() fired, userInfo param ${!!userInfo}`);
        if(!!userInfo){
            const petsCollectionRef = firestore.collection('pets');
            const myPetsQuery = petsCollectionRef.where('owner', '==', userInfo?.id);
            myPetsQuery.onSnapshot(querySnapshot =>{
                const selected_pet = querySnapshot.docChanges()?.find(change => change.type == 'added');
                if(!!selected_pet) setSelectedPet(selected_pet);
                const records = querySnapshot.docs?.reduce((pets, pet)=>{
                    pets[pet.id] = {...pet};
                    return pets;
                }, {});
                console.log(`myPets results from firebase query: ${JSON.stringify(records)}`);
                setMyPets(records);
            });
        }
    }
    useEffect(()=>{
        loadPets(userInfo);
        console.log(`%cmyPets: ${JSON.stringify(myPets)}`, 'color:purple;font-size:large;');
        console.log(`%cuser from home page: ${JSON.stringify(userInfo)}`, 'color:blue;');
    }, [myPets, userInfo]);
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
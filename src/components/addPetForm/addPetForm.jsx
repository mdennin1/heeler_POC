import React, {useReducer, useEffect} from 'react';
import './addPetForm.scss';
import PET_ACTIONS from '../../constants/petActions';
//recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {loginState} from '../../recoil/atoms/loginState';
import { myPetsState } from '../../recoil/atoms/myPets';
import {selectedPet} from '../../recoil/selectors/petSelectors';
//components
import FormInput from '../../components/formInput/formInput';
import Btn from '../../components/btn/btn';
//firebase
import {firestore} from '../../firebase/firebase';

// const reducer = (state, action) =>{
//     const {type, payload} = action;
//     switch(type){
//         case PET_ACTIONS.nameChange:
//             state = {...state, name: payload};
//             setPet(state);
//             return state;
//         case PET_ACTIONS.dobChange:
//             return {...state, dob: payload};
//         case PET_ACTIONS.photoChange:
//             return {...state, photo: payload};
//         case PET_ACTIONS.addPet:
//         default:
//             break;
//     }
// }
const AddPetForm = () =>{
    const [pet, setPet] = useRecoilState(selectedPet);
    const reducer = (state, action) =>{
        const {type, payload} = action;
        switch(type){
            case PET_ACTIONS.nameChange:
                state = {...state, name: payload};
                return state;
            case PET_ACTIONS.dobChange:
                return {...state, dob: payload};
            case PET_ACTIONS.photoChange:
                return {...state, photo: payload};
            case PET_ACTIONS.addPet:
                const newPet = createAPet(state);
                setMyPets({...myPets, [newPet.id]: newPet});
                setPet(newPet);
                break;
            default:
                break;
        }
    }
    const userInfo = useRecoilValue(loginState);
    const [state, dispatch] = useReducer(reducer, pet);
    const [myPets, setMyPets] = useRecoilState(myPetsState);
    
    useEffect(()=>{
        console.log(`pet: ${JSON.stringify(pet)}`);
        console.log(`myPets: ${JSON.stringify(myPets)}`);
    }, [pet, myPets]);
    const petRef = pet ? firestore.doc(`pets/${pet.id}`) : firestore.collection('pets/');
    const createAPet = async pet => {
        console.log('%ccreateAPet() fired!', 'color:red;');
        const petSnapshot = petRef.get();
        if (!petSnapshot.exists) {
            const createdAt = new Date();
            try {
              await petRef.set({
                ...pet,
                createdAt,
                owner: userInfo.id
              });
            } catch (error) {
              console.log('error creating pet', error.message);
            }
        }

    }
    return(
        <div>
            <div className='add-pet-container'>
                <FormInput label="Pet's name" name="name" value={state.name} dispatch={dispatch} />
                <FormInput label='Birthdate' name='dob' value={state.dob} dispatch={dispatch} />
            </div>
            {
                pet.id ? (<Btn onClick={()=>reducer({type: PET_ACTIONS.savePet, payload: pet})}>Save</Btn>) :
                (<Btn onClick={()=>dispatch({type: PET_ACTIONS.addPet, payload: pet})}>Add Pet</Btn>)
            }
        </div>
    );
}
//
export default AddPetForm;
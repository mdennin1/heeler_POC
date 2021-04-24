import React, {useReducer, useEffect} from 'react';
import './addPetForm.scss';
import PET_ACTIONS from '../../constants/petActions';
//recoil
import { useRecoilState, useRecoilValue} from 'recoil';
import {loginState} from '../../recoil/atoms/loginState';
import {showAddPetState} from '../../recoil/atoms/myPets';
//components
import FormInput from '../../components/formInput/formInput';
import Btn from '../../components/btn/btn';
//firebase
import {firestore} from '../../firebase/firebase';
//
const AddPetForm = ({pet}) =>{
    const [showAddPetModal, setShowAddPetModal] = useRecoilState(showAddPetState);
    const reducer = (state, action) =>{
        const {type, payload} = action;
        switch(type){
            case PET_ACTIONS.nameChange:
                return {...state, name: payload};
            case PET_ACTIONS.dobChange:
                return {...state, dob: payload};
            case PET_ACTIONS.photoChange:
                console.log(payload);
                return {...state, photo: payload};
            case PET_ACTIONS.addPet:
                createAPet(state);
                break;
            case PET_ACTIONS.defaultState:
                return {...payload};
            default:
                break;
        }
    }
    const handleCreateClick = event =>{
        console.log(`handleCreateClick() fired!`);
        event.preventDefault();
        createAPet(state);
    }
    const userInfo = useRecoilValue(loginState);
    const [state, dispatch] = useReducer(reducer, {});
    
    useEffect(()=>{
        if(!!pet) {
            const defaultAction = {type: PET_ACTIONS.defaultState, payload: pet};
            dispatch(defaultAction);
        }
        console.log(`%cadd pet form state: ${JSON.stringify(state)}`, 'color:purple;');
    }, [state, showAddPetModal]);

    const createAPet = async (pet) => {
        if(userInfo?.id){
            const createdAt = new Date();
            const petsRef = firestore.collection('pets');
            userInfo?.id ? await petsRef.add({...pet, createdAt, owner: userInfo.id}) : alert('not logged in. cant create a pet');
            // const query = petsRef.where('owner', '==', userInfo.id);
            // const querySnapshot = await query.get();
            // const changes = querySnapshot.docChanges();
            // const newRecord = changes?.find(change => change.type === 'added')?.doc?.data();
            // console.log(`added record: ${JSON.stringify(newRecord)}`);
            // const recordId = changes?.find(change => change.type === 'added')?.doc?.id;
            // console.log(`recordId: ${recordId}`);
            // await setMyPets({...myPets, [recordId]: newRecord});
            // console.log(`myPets: ${JSON.stringify(myPets)}`);
            setShowAddPetModal(false);
        }
    }
    return(
        <form onSubmit={e=>handleCreateClick}>
            <label htmlFor="name-input">
                Name:&nbsp;
                <input id="name-input" value={state.name} onChange={e=>dispatch({type: PET_ACTIONS.nameChange, payload: e.target.value})}/>
            </label>
            <label htmlFor="photo-input">
                Photo:&nbsp;
                <input id='photo-input' type='file' value={state.photo} onChange={e=>dispatch({type: PET_ACTIONS.photoChange, payload: e.target.value})}/>
            </label>
            <button id='add-a-pet' type='submit' value='submit'>Add Pet</button>
        </form>
    );
}
//
export default AddPetForm;
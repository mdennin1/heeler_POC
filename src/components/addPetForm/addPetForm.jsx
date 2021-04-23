import React, {useReducer, useEffect} from 'react';
import './addPetForm.scss';
import PET_ACTIONS from '../../constants/petActions';
//recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {loginState} from '../../recoil/atoms/loginState';
import {myPetsState, selectedPetState, selectedPetIdState} from '../../recoil/atoms/myPets';
//components
import FormInput from '../../components/formInput/formInput';
import Btn from '../../components/btn/btn';
//firebase
import {firestore} from '../../firebase/firebase';
//
const AddPetForm = ({pet}) =>{
    const [myPets, setMyPets] = useRecoilState(myPetsState);
    const reducer = (state, action) =>{
        const {type, payload} = action;
        switch(type){
            case PET_ACTIONS.nameChange:
                return {...state, name: payload};
            case PET_ACTIONS.dobChange:
                return {...state, dob: payload};
            case PET_ACTIONS.photoChange:
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
        event.preventDefault();
        createAPet(state);
    }
    const userInfo = useRecoilState(loginState);
    const [state, dispatch] = useReducer(reducer, {});
    
    useEffect(()=>{
        if(!!pet) {
            const defaultAction = {type: PET_ACTIONS.defaultState, payload: pet};
            dispatch(defaultAction);
        }
        console.log(`%cuserInfo in addPetForm: ${JSON.stringify(userInfo)}`, 'color:blue;');
    }, [myPets, userInfo]);

    const createAPet = async (pet) => {
        const createdAt = new Date();
        const petsRef = firestore.collection('pets');
        userInfo?.id ? await petsRef.add({...pet, createdAt, owner: userInfo.id}) : alert('not logged in. cant create a pet');
        const query = petsRef.where('owner', '==', userInfo.id);
        const querySnapshot = await query.get();
        const changes = querySnapshot.docChanges();
        const newRecord = changes?.find(change => change.type === 'added')?.doc?.data();
        console.log(`added record: ${JSON.stringify(newRecord)}`);
        const recordId = changes?.find(change => change.type === 'added')?.doc?.id;
        console.log(`recordId: ${recordId}`);
        await setMyPets({...myPets, [recordId]: newRecord});
        console.log(`myPets: ${JSON.stringify(myPets)}`);
        //
    }
    return(
        <form onSubmit={e=>handleCreateClick(e)}>
            <label htmlFor="name-input">
                Name:
                <input id="name-input" value={state.name} onChange={e=>dispatch({type: PET_ACTIONS.nameChange, payload: e.target.value})}/>
            </label>
            <button id='add-a-pet' type='submit' value='submit'>Add Pet</button>
        </form>
    );
}
//
export default AddPetForm;
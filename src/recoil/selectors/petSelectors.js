import { selector } from 'recoil';
import { selectedPetId, myPetsState } from '../atoms/myPets';

export const selectedPet = selector({
    key: 'selectedPet',
    get: ({get}) =>{
        const pets = get(myPetsState);
        const petId = get(selectedPetId);
        return pets ? pets[petId] : null;
    }
})
import { selector } from 'recoil';
import { selectedPetIdState, myPetsState } from '../atoms/myPets';

export const selectedPetSelector = selector({
    key: 'selectedPet',
    get: ({get}) =>{
        const pets = get(myPetsState);
        const petId = get(selectedPetIdState);
        return !!pets ? pets[petId] : null;
    }
});
export const myPetsIdsSelector = selector({
    key: 'myPetsIdsSelector',
    get: ({get}) =>{
        const myPets = get(myPetsState);
        return !!myPets ? Object.keys(myPets) : [];
    }
})
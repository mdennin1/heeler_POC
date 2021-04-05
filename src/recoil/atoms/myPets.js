import { atom } from 'recoil';
//
export const showMyPetsDropdownState = atom({
    key: 'showMyPetsDropdownState',
    default: false,
});
export const myPetsState = atom({
    key: 'myPets',
    default: {},
});
export const showAddPetState = atom({
    key: 'showAddPet',
    default: false
});
export const selectedPetId = atom({
    key: 'selectedPetId',
    default: null,
});
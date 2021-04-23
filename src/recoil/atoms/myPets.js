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
export const selectedPetIdState = atom({
    key: 'selectedPetId',
    default: null,
});
export const selectedPetState = atom({
    key: 'selectedPet',
    default: null
});
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
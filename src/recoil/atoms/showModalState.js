import {atom} from 'recoil';

export const showModalState = atom({
    key: 'showModalState',
    default: false
});
export const addPetModalState = atom({
    key: 'addPetModalState',
    default: false
});
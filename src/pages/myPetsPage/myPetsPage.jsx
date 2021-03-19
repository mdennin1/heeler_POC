import React from 'react';
import './myPetsPage.scss';
import PetDetails from '../../components/petDetails/petDetails';
import CardList from '../../components/cardList/cardList';

export default function myPetsPage() {
    const myPets = [
        { Id: 8, name: 'ovi', age: 8, weight: 32, breed: 'aussie-mix', disposition: 'lazy'},
        { Id: 1, name: 'domino', age: 14, weight: 50, breed: 'boarder-collie', disposition: 'crazy'},
        { Id: 32, name: 'huxley', age: 5, weight: 55, breed: 'golden-doodle', disposition: 'friendly'},
        { Id: 48, name: 'zooey', age: 3, weight: 65, breed: 'golden-doodle', disposition: 'gulpy' }
    ];
    const buildPetCards = myPets => myPets?.map(pet=>({Id: pet.Id, title: pet.name, subtitle: pet.breed, body: <PetDetails {...pet}/>}));
    return (<CardList className='pet-details' cards={buildPetCards(myPets)} />);
}

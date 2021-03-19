import React, {useEffect} from 'react';
import './petDetails.scss';

export default function PetDetails({Id, name, age, weight, breed, disposition, photo}) {
    useEffect(()=>{
        console.log(Id, name, age, weight, breed, disposition);
    });
    return (
        <>
            <div className='pet-details-container'>
                <span className='pet-photo'>{photo}</span>&nbsp;
                <span className='pet-detail'>Name: {name}</span>&nbsp;
                <span className='pet-detail'>Age: {age}</span>&nbsp;
                <span className='pet-detail'>Breed(s): {breed}</span>&nbsp;
                <span className='pet-detail'>Weight: {weight}</span>&nbsp;
                <span className='pet-detail'>Disposition: {disposition}</span>
            </div>
        </>
    )
}

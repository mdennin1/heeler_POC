import React, {useEffect} from 'react';
import './petDetails.scss';

export default function PetDetails({Id, name, age, weight, breed, disposition, photo}) {
    useEffect(()=>{
        console.log(Id, name, age, weight, breed, disposition);
    });
    return (
        <>
            <div className='pet-details-container'>
                {/* <span className='pet-photo'>{photo}</span>&nbsp; */}
                <div
                    className='pet-photo'
                    style={{
                    backgroundImage: `url(${photo})`
                    }}
                />
                <div className='pet-details'>
                    <span className='pet-detail'><b>Name:</b>&nbsp;{name}</span>
                    <span className='pet-detail'><b>Age:&nbsp;</b>{age}</span>
                    <span className='pet-detail'><b>Breed(s):&nbsp;</b>{breed}</span>
                    <span className='pet-detail'><b>Weight:&nbsp;</b>{weight}</span>
                    <span className='pet-detail'><b>Disposition:&nbsp;</b>{disposition}</span>
                </div>
            </div>
        </>
    )
}

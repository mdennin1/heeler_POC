import React from 'react';
import './petSelectorOption.scss';
//
const PetSelectorOption = ({pet}) => {
    return(
        <>
            { pet ?
                (<div id={pet.name} className='container'>
                    <span>
                        <div className='display-field'>photo: {pet.photo}</div>
                        <div className='display-field'>name: {pet.name}</div>
                    </span>
                </div>) : null
            }
        </>
    );
}
//
export default PetSelectorOption;
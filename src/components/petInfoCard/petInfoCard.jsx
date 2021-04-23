import React, {useEffect} from 'react';
import './petInfoCard.scss';

const PetInfoCard = (pet) =>{
    useEffect(() =>{
        console.log(`PetInfoCard pet: ${JSON.stringify(pet)}`);
    }, [pet]);
    return(
        <>
            <form className='card'>
                { pet ? 
                    (
                        <div className='pet-details'>
                            <div className='input-display'>
                                <label htmlFor="nameInput">
                                    Name:&nbsp;
                                    <input id="nameInput" value={pet.name} />
                                </label>
                            </div>
                            <div className='input-display'>
                                <label htmlFor="dobInput">
                                    Date of Birth:&nbsp;
                                    <input id="dobInput" type="date" value={pet.dob} />
                                </label>
                            </div>
                            <div className='input-display'>
                                <label htmlFor="breedsInput">
                                    Breeds:&nbsp;
                                    <input id="breedsInput" value={pet.breeds} />
                                </label>
                            </div>
                        </div>
                    ) : null
                }
            </form>
        </>
    );
}
//
export default PetInfoCard;
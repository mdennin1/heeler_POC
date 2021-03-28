import React from 'react';
//components
import PetInfoCard from '../../components/petInfoCard/petInfoCard';
//
const HomePage =() => {
    return (
        <div className='home-page'>
            <div className='home-page-container'>
                <PetInfoCard />
            </div>
        </div>
    )
}
//
export default HomePage;
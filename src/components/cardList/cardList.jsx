import React, {useEffect} from 'react';
import Card from '../../components/card/card';
import './cardList.scss';

export default function CardList({cards, children}) {
    useEffect(()=>console.log(cards, children));
    return (
        <>
            <div className='card-list'>
                {cards?.map(card => (<Card className="card" key={card.Id} {...card} />))}
            </div>
        </>
    )
}

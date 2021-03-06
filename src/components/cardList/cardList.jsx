import React from 'react'
import Card from '../../components/card';

export default function CardList(props) {
    return (
        <div className='card-list'>
            {props.cards?.map(card => <Card key={card.Id} {...card} />)}
        </div>
    )
}

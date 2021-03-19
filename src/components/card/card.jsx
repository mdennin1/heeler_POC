import React, {useEffect} from 'react';
import './card.scss';

export default function Card({title, subtitle, img, imgName, children, body, footer}) {
    useEffect(() => {
        console.log(title, subtitle, children);
    });
    return (
        <>
            <div className='card'>
                {
                    img ? (
                    <div className='image'>
                        <img src={img} alt={imgName} />
                    </div>
                    ) : null 
                }
                { 
                    title ? (
                    <div className='card-header'>
                        <h4 className='title'>{title.toUpperCase()}</h4>
                        <h5 className='subtitle'>{subtitle}</h5>
                        {/* <div className='title'>
                            <h4>{title.toUpperCase()}</h4>
                            <span className='subtitle'>
                                <h5>{subtitle}</h5>
                            </span>
                        </div> */}
                    </div>
                    ) : null
                }
                {/* { 
                    children ? (
                        <div className='card-body'>
                            {children}
                        </div>
                    ) : null
                } */}
                {
                    body ? (
                        <div className="body">{body}</div>
                    ) : null
                }
                { 
                    footer ? (
                        <div className='card-footer'>
                            {footer}
                        </div>
                    ) : null
                }
            </div>
        </>
    )
}
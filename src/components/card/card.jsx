import React from 'react'

export default function card({title, subtitle, img, imgName, children, footer}) {
    return (
        <div className='card-container'>
            {
                img ? (
                <div className='card-image'>
                    <img src={img} alt={imgName} />
                </div>
                ) : null 
            }
            { 
                title ? (
                <div className='card-header'>
                    <div className='title'>
                        <h1>{title}</h1>
                        <div className='subtitle'>
                            <h3>{subtitle}</h3>
                        </div>
                    </div>
                </div>
                ) : null
            }
            { 
                children ? (
                    <div className='card-body'>
                        {children}
                    </div>
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
    )
}

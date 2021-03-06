import React from 'react';
import './formInput.scss';
//
const FormInput = ({ label, value, name, dispatch, ...otherProps}) =>{
    return(
        <div className="group">
            <input className="form-input" {...otherProps} onChange={event=>{
                event.preventDefault();
                dispatch({type: name, payload: event.target.value})
                }
            } />
            {
                label ? 
                (<label className={`${value?.length ? 'shrink' : ''} form-input-label`}>
                    {label}
                </label>)
                : null
            }
        </div>
    )
}
//
export default FormInput;
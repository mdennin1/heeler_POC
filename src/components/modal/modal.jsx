
import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
//
const Portal = ({ id, children }) => {
  const el = useRef(document.getElementById(id) || document.createElement('div'));
  const [dynamic] = useState(!el.current.parentElement)
  useEffect(() => {
    if (dynamic) {
      el.current.id = id;
      el.current.classList.add('modal-overlay')
      document.body.appendChild(el.current);
    }
    return () => {
      if (dynamic && el.current.parentElement) {
        el.current.parentElement.removeChild(el.current);
      }
    }
  }, [id])
  return createPortal(children, el.current);
};
//
export default memo(Portal);

//////////////////////////////////////////////////////////////
/*
import React from 'react';
import {createPortal} from 'react-dom';
// import {showModalState} from '../../recoil/atoms/showModalState';
// import {useRecoilState} from 'recoil';

const Modal = ({children, showModal, setShowModal}) => {
    const close = '&#10006';
    // const [showModal, setShowModal] = useRecoilState(showModalState);
    if(!!showModal){
        return createPortal(
            <>  
                <div className='modal-overlay'/>
                <div className='modal-content'>
                    <div className='close-button-container'>
                        <button className='close-button' onClick={()=>setShowModal(false)}>{close}</button>
                    </div>
                    {children}
                </div>
            </>,
            document.getElementById('portal')
        );
    }
}
//
export default Modal;
*/
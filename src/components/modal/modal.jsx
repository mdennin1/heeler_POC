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
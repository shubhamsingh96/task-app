import React from 'react'
import { connect } from 'react-redux'
import '../scss/modal.scss'
import { CLOSE_MODAL } from '../store/actions'

interface ModalProps{
  closeModal:()=>void;
}

const Modal:React.FC<ModalProps> = ({children,closeModal}) => {
  return (
    <article className='modal-wrapper'>
      <div className='modal-content'>
      {children}
      <span className='modal-close-btn' onClick={closeModal}>&#10005;</span>
      </div>
      <div className='custom-modal' onClick={closeModal} />
    </article>
  )
}

const mapStateToProps = (state:any) => ({});

const mapDispatchToProps = (dispatch:any) => {
  return {
    closeModal:()=>dispatch({type:CLOSE_MODAL})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Modal)

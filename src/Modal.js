import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const {
    isModelOpen,
    openModel,
    closeModel,
    questions,
    correct,
  } = useGlobalContext()
  return (
    <dic
      className={`${
        isModelOpen ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className='modal-content'>
        <h2>Congrats !!!</h2>
        <p>
          you answered {((correct / questions.length) * 100).toFixed(0)}%
          correct answer
        </p>
        <button onClick={() => closeModel()} className='close-btn'>
          Play again!!
        </button>
      </div>
    </dic>
  )
}

export default Modal

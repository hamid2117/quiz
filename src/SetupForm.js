import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const { error, handleBtn, handleSubmite, quiz } = useGlobalContext()
  return (
    <main>
      <section className='quiz quiz-small'>
        <form className='setup-form'>
          <h2>Setup quiz</h2>
          {/* amount */}
          <div className='form-control'>
            <label htmlFor='amount'>number of questions</label>
            <input
              type='number'
              name='amount'
              id='amount'
              value={quiz.amount}
              onChange={handleBtn}
              className='form-input'
              min={1}
              max={50}
            />
          </div>
          {/* category */}
          <div className='form-control'>
            <label htmlFor='category'>Category</label>
            <select
              type='text'
              name='category'
              id='category'
              value={quiz.category}
              onChange={handleBtn}
              className='form-input'
            >
              <option value='sports'>Sports</option>
              <option value='politics'>politics</option>
              <option value='history'>history</option>
            </select>
          </div>
          {/* category */}
          <div className='form-control'>
            <label htmlFor='difficulty'>Difficulty</label>
            <select
              type='text'
              name='difficulty'
              id='difficulty'
              value={quiz.difficulty}
              onChange={handleBtn}
              className='form-input'
            >
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>
          {error && (
            <p className='error'>
              can't genrate questions ,please try different options
            </p>
          )}
          <button className='submit-btn' type='submit' onClick={handleSubmite}>
            start
          </button>
        </form>
      </section>
    </main>
  )
}

export default SetupForm

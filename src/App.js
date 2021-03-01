import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const {
    waiting,
    loading,
    questions,
    correct,
    index,
    nextBtn,
    checkAns,
  } = useGlobalContext()
  if (loading) {
    return <Loading />
  }
  if (waiting) {
    return <SetupForm />
  }
  console.log(questions)
  const { correct_answer, incorrect_answers, question } = questions[index]
  // const answer = [...incorrect_answers, correct_answer] //... array ka undr array walu ko nikalata ha
  let answer = [...incorrect_answers]
  const tempIndex = Math.floor(Math.random() * 4)
  if (tempIndex === 3) {
    answer.push(correct_answer)
  } else {
    answer.push(answer[tempIndex])
    answer[tempIndex] = correct_answer
  }

  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct : {correct} / {index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
        </article>
        <div className='btn-container'>
          {answer.map((ans, index) => {
            return (
              <button
                key={index}
                className='answer-btn'
                dangerouslySetInnerHTML={{ __html: ans }}
                onClick={() => checkAns(correct_answer === ans)}
              />
            )
          })}
        </div>
        <button className='next-question' onClick={nextBtn}>
          next
        </button>
      </section>
    </main>
  )
}

export default App

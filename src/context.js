import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  })
  const fetchApi = async (url) => {
    setLoading(true)
    const response = await axios(url).catch((error) => console.log(error))
    if (response) {
      let data = response.data.results
      if (data.length > 0) {
        setQuestions(data)
        setLoading(false)
        setWaiting(false)
      } else {
        setWaiting(true)
      }
    } else {
      setWaiting(true)
    }
  }
  const nextBtn = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1
      if (index > questions.length - 1) {
        openModel()
        return 0
      } else {
        return index
      }
    })
  }
  const checkAns = (value) => {
    if (value) {
      setCorrect((oldNum) => {
        return oldNum + 1
      })
    }
    nextBtn()
  }
  const openModel = () => {
    setIsModelOpen(true)
  }
  const closeModel = () => {
    setIsModelOpen(false)
    setWaiting(true)
    setCorrect(0)
  }
  // useEffect(() => {
  //   fetchApi(tempUrl)
  // }, [])

  const handleSubmite = (e) => {
    e.preventDefault()

    const { amount, category, difficulty } = quiz
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`
    fetchApi(url)
  }
  const handleBtn = (e) => {
    const name = e.target.name
    const value = e.target.value
    setQuiz({ ...quiz, [name]: value })
  }

  return (
    <AppContext.Provider
      value={{
        openModel,
        isModelOpen,
        closeModel,
        waiting,
        nextBtn,
        checkAns,
        loading,
        questions,
        index,
        correct,
        error,
        quiz,
        handleBtn,
        handleSubmite,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

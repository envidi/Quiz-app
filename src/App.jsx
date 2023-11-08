import Quiz from "./Component/Quiz/Quiz"
// import { Quiz_data as questions } from "./ultilities"
import './App.css'
import { useEffect,useState } from "react"
function App() {
  const [questions , setQuestions ] = useState([])
  useEffect(()=>{
    getQuestions()
  },[])
  const getQuestions = async ()=>{
    try {
      const response = await fetch('https://644982a3e7eb3378ca4ba471.mockapi.io/questions')
      const questionResponse = await response.json(); 
       setQuestions(questionResponse)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    {questions.length ? <Quiz questions={questions}/> : (<div className="lds-facebook"><div></div><div></div><div></div></div>)}
    </>
  )
}

export default App

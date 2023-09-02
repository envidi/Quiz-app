import React, {useEffect, useState} from 'react'
import './Result.css'
function Result({totalQuestion , result, onTryAgain}) {
    const [name, setName] = useState('')
    const [highScores, setHighScores] = useState([])
    const [showScores, setShowScores] = useState(false)

    useEffect(()=>{
        setHighScores(JSON.parse(localStorage.getItem('highScores')) || [])
    },[])

    const handleSave = ()=>{
        const score = {
            name ,
            score : result.score
        }
        const newHighScores = [...highScores,score].sort((a,b)=>b.score - a.score)
        setHighScores(newHighScores)
        setShowScores(true)
        localStorage.setItem('highScores',JSON.stringify(newHighScores))
    }

    const handleTryAgain = ()=>{
        setShowScores(false)
        setHighScores([])
        onTryAgain()
    }
  return (
    <div className="result">
        <h3>Result</h3>
        <p>
            Total Question  : <span>{totalQuestion}</span>
        </p>
        <p>
            Total Score  : <span>{result.score}</span>
        </p>
        <p>
            Correct Answers  : <span>{result.correctAnswers}</span>
        </p>
        <p>
            Wrong Answers  : <span>{result.wrongAnswers}</span>
        </p>
        <button onClick={handleTryAgain}>Try again</button>
        {!showScores ? <>
            <h3>
                Enter your name below <br /> to save your score 
            </h3>

            <input type="text" placeholder='Your Name...' value={name} onChange = {(e)=>setName(e.target.value)}/>
            <button onClick={handleSave}>Save your name</button>
        </> : (<>
        <table>
            <thead>
                <tr>
                    <th>Ranking</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {
                    highScores.map((highScore,i)=>{
                        return (
                            <tr key={i}>
                                <td>{i}</td>
                                <td>{highScore.name}</td>
                                <td>{highScore.score}</td>
                            </tr>
                        )
                    })
                }
               
            </tbody>
        </table>
        </>)}
        
    </div> 
  )
}

export default Result
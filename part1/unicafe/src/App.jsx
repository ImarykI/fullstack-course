import { useState } from 'react'

const StatisticLine = ({text, stat}) =>
    <tr>
      <td>{text}</td> 
      <td>{stat}</td>
    </tr>

const Statistics = (props) => {

  if(props.good + props.bad + props.neutral === 0) return <p>No feedback given</p>

  return(
    <table>
      <tbody>
        <StatisticLine text='good' stat={props.good} />
        <StatisticLine text='neutral' stat={props.neutral} />
        <StatisticLine text='bad' stat={props.bad} />
        <StatisticLine text='all' stat={props.all} />
        <StatisticLine text='average' stat={props.average} />
        <StatisticLine text='positive' stat={props.positive} />
      </tbody>
    </table>
  )
}

const Button = ({func, text}) => <button onClick={func}>{text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)


  const goodFeedback = () =>{
    const updated = good +1
    setGood(updated)

    const updatedAll = all+1
    setAll(updatedAll)
    
    setPositive(updated *100/updatedAll)

    setAverage((updated- bad)/updatedAll)
  }

  const neutralFeedback = () =>{

    setNeutral(neutral + 1)

    const updatedAll = all+1
    setAll(updatedAll)

    setPositive(good *100/updatedAll)

    setAverage((good-bad)/updatedAll)
  }
  
  const badFeedback = () =>{

    const updated = bad + 1
    setBad(updated)

    const updatedAll = all+1
    setAll(updatedAll)

    setPositive(good *100/updatedAll)
    
    setAverage((good - updated)/updatedAll)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button func = {goodFeedback} text = "good" />
      <Button func = {neutralFeedback} text = "neutral" />
      <Button func = {badFeedback} text = "bad" />

      <h1>statistics</h1>
      <Statistics
        good ={good}
        bad = {bad} 
        neutral = {neutral}
        all = {all}
        average = {average}
        positive = {positive + " %"}
      />
    </div>
  )
}

export default App
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const Statistics = (props) => {
  console.log(props);
  const totalFeedBack = props.good + props.neutral + props.bad;
  if (totalFeedBack === 0) {
    return <StatisticLine text="No Feedback provided" />;
  }

  return (
    <div>
      <StatisticLine text="Good Feedback:" value={props.good} />
      <StatisticLine text="Bad Feedback" value={props.bad} />
      <StatisticLine text="Neutral Feedback" value={props.neutral} />
      <StatisticLine text="Total Feedback" value={totalFeedBack} />
      <StatisticLine
        text="Average Feedback"
        value={(props.good * 1 + (props.bad * 1) / totalFeedBack).toFixed(1)}
      />
      <StatisticLine
        text="Percentage of positive feedback"
        value={((props.good / totalFeedBack) * 100).toFixed(1)}
      />
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <p>{props.value}</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const increaseGood = () => {
    setGood(good + 1);
  };
  const increaseBad = () => {
    setBad(bad + 1);
  };
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <h1>Provide Feedback</h1>
      <Button handleClick={increaseGood} text="Good" />
      <Button handleClick={increaseBad} text="Bad" />
      <Button handleClick={increaseNeutral} text="Neutral" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;

import { useState } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState("");

  const getJoke = async () => {
    const res = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const data = await res.json();
    setJoke(`${data.setup} - ${data.punchline}`);
  };

  return (
    <div className="App">
      <h1>Joke Generator</h1>
      <button onClick={getJoke}>Get Joke</button>
      <p>{joke}</p>
    </div>
  );
}

export default App;

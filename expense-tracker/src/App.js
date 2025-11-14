import { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { desc, amount: parseFloat(amount) }]);
    setDesc("");
    setAmount("");
  };

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <form onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {expenses.map((exp, i) => (
          <li key={i}>
            {exp.desc}: ${exp.amount}
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
    </div>
  );
}


export default App;

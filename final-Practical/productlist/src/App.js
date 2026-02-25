import React from "react";

function App() { 
  const products = [
    { id: 1, name: "Laptop", price: 800, image: "" },
    { id: 3, name: "Tablet", price: 300, image: "" },
    { id: 2, name: "Smartphone", price: 500, image: "" }
  ];

  return (
    <div>
      <h1>Amazon Cart</h1>
      {products.map((product) => (
        <li
          key={product.id}
          style={{
            height: "300px",
            width: "200px",
            listStyleType: "none",
            border: "1px solid gray",
            margin: "10px",
            padding: "30px",
            float: "left",
            textAlign: "center",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ padding: "0px" }}
          />
          <div>
            <h2>{product.name}</h2>
            <p>₹{product.price}</p>
          </div>
        </li>
      ))}
    </div>
  );
}

export default App;

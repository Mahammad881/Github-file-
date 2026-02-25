import React, { useState } from "react";

function RegistrationForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration successful!");
    console.log(data);
  };

  // Simple inline styles
  const styles = {
    container: {
      width: "300px",
      margin: "40px auto",
      padding: "20px",
      background: "#f8f8f8",
      borderRadius: "10px",
      textAlign: "center",
      boxShadow: "0 0 10px lightgray"
    },
    title: {
      marginBottom: "20px",
      fontFamily: "Arial"
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px"
    },
    button: {
      width: "100%",
      padding: "10px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={data.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={data.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;

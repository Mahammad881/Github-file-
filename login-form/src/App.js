import React, { useState } from "react";

function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert("Please enter both email and password!");
      return;
    }

    alert("Login Successful!");
    console.log("Login Data:", loginData);

    setLoginData({ email: "", password: "" });
  };

  return (
    <div
      style={{
        width: "320px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textAlign: "center",
        fontFamily: "Arial"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Login Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={loginData.email}
          onChange={handleChange}
          required
          style={{
            width: "90%",
            padding: "10px",
            fontSize: "14px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #888"
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
          style={{
            width: "90%",
            padding: "10px",
            fontSize: "14px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #888"
          }}
        />

        <button
          type="submit"
          style={{
            width: "95%",
            padding: "10px",
            fontSize: "15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

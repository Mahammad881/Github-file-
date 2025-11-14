import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "Arial, sans-serif" ,
                     backgroundColor: "#d52525ff",
                     padding: "10px",
                     display: "flex",
                     justifyContent: "center",
                    

                     
      }}>
        {/* Navigation Bar */}
        <nav
          style={{
            backgroundColor: "#333",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            
          }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              gap: "20px",
              padding: "0",
              margin: "0",
            }}
          >
            <li>
              <Link to="abc" style={linkStyle}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" style={linkStyle}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" style={linkStyle}>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Page Content */}
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <Routes>
            <Route path="abc" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

// Style for navigation links
const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
};

export default App;



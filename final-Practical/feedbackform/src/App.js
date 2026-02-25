import React, { useState } from "react";

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    comments: "",
  });

  const [feedbackList, setFeedbackList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.rating) {
      alert("Please fill all required fields!");
      return;
    }

    setFeedbackList([...feedbackList, formData]);
    setFormData({ name: "", email: "", rating: "", comments: "" });
  };

  return (
    <div style={{ width: "70%", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Feedback Form</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: "8px" }}
          />
        </div>

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: "8px" }}
          />
        </div>

        {/* Rating */}
        <div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <label>Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
            style={{ padding: "8px" }}
          />
        </div>

        {/* Comments full width */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <label>Comments:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            style={{ padding: "8px", height: "80px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit Feedback
        </button>
      </form>

      <h3 style={{ textAlign: "center" }}>Submitted Feedback:</h3>

      {feedbackList.length === 0 ? (
        <p style={{ textAlign: "center" }}>No feedback yet.</p>
      ) : (
        feedbackList.map((fb, index) => (
          <div key={index} style={{ padding: "10px 0" }}>
            <strong>{fb.name}</strong> ({fb.email}) <br />
            Rating: {fb.rating}/5 <br />
            {fb.comments}
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default FeedbackForm;

import React, { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!username) newErrors.username = "Username is required.";

    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";

    if (!password) newErrors.password = "Password is required.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission (e.g., send data to an API)
      console.log("Form submitted successfully:", formData);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Create Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.username && <span style={styles.error}>{errors.username}</span>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Select Role</label>
            <div style={styles.radioGroup}>
              <label>
                <input
                    type="radio"
                    id="employer"
                    name="role"
                    value="employer"
                    onChange={handleInputChange}
                    style={styles.radioInput}
                />
                Employer
              </label>
              <label>
                <input
                  type="radio"
                  id="candidate"
                  name="role"
                  value="candidate"
                  onChange={handleInputChange}
                  style={styles.radioInput}
                />
                Candidate
              </label>
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>Sign Up</button>
        </form>
        <p style={styles.footer}>
          Already have an account? <a href="/login" style={styles.link}>Log in</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#121212", // Dark background color
      padding: "20px",
    },
    formContainer: {
      backgroundColor: "#1f1f1f", // Dark form container
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      width: "100%",
      maxWidth: "450px",
    },
    header: {
      textAlign: "center",
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: "600",
      color: "#fff", // Light text for dark mode
      marginBottom: "30px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      fontWeight: "500",
      marginBottom: "8px",
      color: "#bbb", // Lighter label text
      display: "block", // Ensures label and input are stacked vertically
    },
    input: {
      padding: "12px 16px",
      fontSize: "16px",
      border: "1px solid #444", // Darker border color
      borderRadius: "6px",
      outline: "none",
      backgroundColor: "#333", // Dark background for inputs
      color: "#fff", // Light text in input
      transition: "border-color 0.3s ease",
      marginLeft: "0", // Ensuring margin is controlled at the top level
      width: "100%", // Make input take the full width of the form group
    },
    submitButton: {
      padding: "14px 0",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#007BFF",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    error: {
      fontSize: "12px",
      color: "#e74c3c",
      marginTop: "5px",
    },
    radioInput: {
      marginRight: "20px", // Increases gap between radio button and text
    },
    radioGroup: {
      display: "flex",
      gap: "25px", // Creates a larger space between the two radio options
    },
  };

export default SignupPage;

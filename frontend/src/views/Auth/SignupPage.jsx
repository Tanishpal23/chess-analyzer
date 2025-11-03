
// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
// import axios from 'axios';


// const Signup = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     console.log("Signup Submitted:", form);
//   };

//   return (
//     <div
//       className="d-flex align-items-center justify-content-center bg-light"
//       style={{
//         minHeight: "100vh",
//         width: "100%",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         zIndex: 10,
//       }}
//     >
//       <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
//         <h3 className="text-center mb-4">Create Account</h3>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               className="form-control"
//               placeholder="Enter your full name"
//               value={form.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Email address</label>
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               placeholder="Enter your email"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               placeholder="Enter your password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               className="form-control"
//               placeholder="Re-enter your password"
//               value={form.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>

//          <button type="submit" className="btn btn-primary w-100">
//             Sign Up
//           </button>
//         </form>

//         <div className="text-center mt-3">
//           <span className="text-muted">Already have an account? </span>
//           <Link to="/login" className="text-primary text-decoration-none fw-semibold">
//             Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;












import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // to redirect after signup

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert(res.data.message || "Signup successful!");
      console.log("✅ Signup Success:", res.data);

      // redirect to login page after signup
      navigate("/login");
    } catch (err) {
      console.error("❌ Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Create Account</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted">Already have an account? </span>
          <Link to="/login" className="text-primary text-decoration-none fw-semibold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

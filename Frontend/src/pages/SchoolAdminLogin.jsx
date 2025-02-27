import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const SchoolAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5050/api/users/user-login",
        { email, password }
      );

      if (response.data.user.role === "schooladmin") {
        navigate("/school-admin/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#f8f9fa",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="card p-5 shadow-lg"
        style={{
          width: "450px",
          maxWidth: "90%",
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center mb-4">School Admin Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control p-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label fw-bold">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control p-3"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-3 fw-bold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SchoolAdminLogin;

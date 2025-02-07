import { Mail, Lock, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import { toast } from "react-toastify";
import Preloader from "../pages/home/Preloader";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook for navigation after successful login

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve stored users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find a user that matches the entered email and password
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
        
      sessionStorage.setItem("isAuthenticated", true);

      toast.success("Login successful!");

      setLoading(true);

      setTimeout(() => {
        setLoading(false);

        navigate("/home");
      }, 3000);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-sm shadow-lg w-full max-w-[500px]">
        <h2
          className="text-2xl font-semibold text-center mb-6 text-orange-600"
          style={{ textTransform: "uppercase" }}
        >
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600">Email Address</p>
            <div className="flex items-center border-b-2 border-gray-300 mt-1">
              <Mail className="w-5 h-5 text-gray-500" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 pl-3 bg-transparent border-none focus:outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-600">Password</p>
            <div className="flex items-center border-b-2 border-gray-300 mt-1">
              <Lock className="w-5 h-5 text-gray-500" />
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-2 pl-3 bg-transparent border-none focus:outline-none text-gray-700"
              />
              <button
                type="button"
                className="p-1"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <EyeClosed className="w-5 h-5 text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
        </form>

        {/* Sign-Up Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup" // Adjust the path to match your route for sign-up
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {loading && <Preloader />}
    </div>
  );
};

export default Login;

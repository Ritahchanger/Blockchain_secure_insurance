import { Mail, Lock, User, Phone, IdCard, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  // Regex for strong password validation
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validatePassword = (password) => {
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePassword(password) && validateConfirmPassword()) {
      // Store user data in localStorage
      const userData = {
        firstName: e.target.firstName.value,
        secondName: e.target.secondName.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        id: e.target.id.value,
        password,
      };

      // Check if a user with the same email or ID exists
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some(
        (user) => user.email === userData.email || user.id === userData.id
      );

      if (userExists) {
        toast.error("A user with this email or ID already exists.");
        return;
      }

      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("Account created successfully!");
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[800px]">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-[1rem]">
            {/* First Name */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600">First Name</p>
              <div className="flex items-center border-b-2 border-gray-300 mt-1">
                <User className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  className="w-full p-2 pl-3 bg-transparent border-none focus:outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Second Name */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600">Second Name</p>
              <div className="flex items-center border-b-2 border-gray-300 mt-1">
                <User className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="secondName"
                  placeholder="Enter your second name"
                  className="w-full p-2 pl-3 bg-transparent border-none focus:outline-none text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600">Email Address</p>
            <div className="flex items-center border-b-2 border-gray-300 mt-1">
              <Mail className="w-5 h-5 text-gray-500" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-2 pl-3 bg-transparent border-none focus:outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="flex gap-[1rem]">
            {/* Phone Number */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600">Phone Number</p>
              <div className="flex items-center border-b-2 border-gray-300 mt-1">
                <Phone className="w-5 h-5 text-gray-500" />
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="w-full p-2 pl-3 bg-transparent border-none focus:outline-none text-gray-700"
                />
              </div>
            </div>

            {/* ID Field */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600">ID Number</p>
              <div className="flex items-center border-b-2 border-gray-300 mt-1">
                <IdCard className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="id"
                  placeholder="Enter your ID number"
                  className="w-full p-2 pl-3 bg-transparent border-none focus:outline-none text-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-[1rem]">
            {/* Password Field */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600">Password</p>
              <div className="flex items-center border-b-2 border-gray-300 mt-1">
                <Lock className="w-5 h-5 text-gray-500" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-2 pl-3 bg-transparent border-none focus:outline-none text-gray-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-600">
                Confirm Password
              </p>
              <div className="flex items-center border-b-2 border-gray-300 mt-1">
                <Lock className="w-5 h-5 text-gray-500" />
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full p-2 pl-3 bg-transparent border-none focus:outline-none text-gray-700"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="p-1"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? (
                    <EyeClosed className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-sm mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Already have an account? Login link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/" // Adjust this to your login page route
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

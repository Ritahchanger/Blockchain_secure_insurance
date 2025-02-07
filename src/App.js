import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";

import Login from "./authentication/Login";

import Signup from "./authentication/Signup";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;

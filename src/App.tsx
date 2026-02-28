import { Routes, Route } from "react-router-dom";
import SignUp from "./features/auth/Singup";
import SignIn from "./features/auth/Signin";
import Home from "./features/landing/Pages/Home";
import About from "./features/landing/Pages/About";
import Gallery from "./features/landing/Pages/Gallery";
import Contact from "./features/landing/Pages/Contact";
import Dashboard from "./features/admin/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Gallery" element={<Gallery />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </AuthProvider>
  )
}

export default App

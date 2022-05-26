import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context";
import Home from "./pages/Home";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AuthProvider>
  )
}

export default App

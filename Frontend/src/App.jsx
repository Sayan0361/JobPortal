import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  return (
   <>
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
   </>
  )
}

export default App

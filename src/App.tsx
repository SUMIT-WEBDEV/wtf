import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import AdminLogin from "./components/AdminLogin";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login" element={
              <>
                <Navbar />
                <SignIn />
              </>
            }
          />
          <Route
            path="/admin" element={
              <>
                <Navbar />
                <AdminLogin />
              </>
            }
          />
          <Route
            path="/" element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

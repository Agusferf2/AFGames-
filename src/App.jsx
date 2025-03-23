import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import Login from "./components/Login";
import MesasList from "./components/MesaList";
import Home from "./pages/Home";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Cargando...</p>; 
  }

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element= {<Login />} />
        <Route path="/mesas" element={user ? <MesasList /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/mesas" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;

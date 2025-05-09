import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MesasList from "./pages/MesaList";
import Home from "./pages/Home";
import Turnos from "./pages/turnos";
import Dashboard from "./pages/Dashboard";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ReservaProvider } from "./context/ReservaContext";
import { MesasProvider } from "./context/MesasContext";

function App() {
  const [user] = useAuthState(auth);

  return (
    <MesasProvider>
      <ReservaProvider>
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mesas" element={<MesasList />} />
            <Route path="/turnos" element={<Turnos />} />
            {user && <Route path="/dashboard" element={<Dashboard />} />}
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </ReservaProvider>
    </MesasProvider>
  );
}

export default App;

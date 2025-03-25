import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MesasList from "./pages/MesaList";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element= {<Login />} />
        <Route path="/mesas" element={<MesasList />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

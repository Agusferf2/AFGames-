import { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import imgs from '../assets/background-billar-login.jpg'
import Header from "../components/Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/home";
    } catch (error) {
      setError("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <>
      <Header 
      list={[
        { label: "Inicio", url: "/home" },
        { label: "Disponibilidad", url: "/mesas" },
      ]}/>
    <div className="flex flex-col items-center h-screen justify-center bg-cover bg-center" style={{ backgroundImage: `url(${imgs})` }}>
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6 max-sm:w-11/12">
        <h2 className="text-2xl font-bold text-gray-200 mb-4 max-sm:text-center">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;

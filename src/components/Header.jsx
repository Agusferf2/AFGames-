import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

export default function Header({list}) {
  const [user] = useAuthState(auth);

    const handleLogout = async () => {
      await signOut(auth);
    };
  return (
    <div className="flex justify-between px-4 py-6 w-full items-center backdrop-blur-md fixed max-sm:py-4">
        <h1 className="font-black text-3xl text-white max-sm:text-2xl"><span className="text-green-500">A&F</span> Games</h1>
        <ul className=" text-white flex justify-end items-center gap-4">
        {list.map((item, index) => (
          <li key={index} className="max-md:hidden">
            {item.url.startsWith("#") ? (
              <a href={item.url} className="hover:text-green-400">
                {item.label}
              </a>
            ) : (
              <Link to={item.url} className="hover:text-green-400">
                {item.label}
              </Link>
            )}
          </li>
        ))}
            {user ? <button className="bg-green-800 text-white font-bold py-2 px-4 rounded max-sm:text-sm" onClick={handleLogout}>Cerrar Sesión</button> :<Link to="/login" className="bg-green-800 text-white font-bold py-2 px-4 rounded ml-3 max-sm:text-sm">Iniciar Sesión</Link>}
        </ul>
    </div>
  )
}

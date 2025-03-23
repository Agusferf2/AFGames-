import React from 'react'
import { Link } from "react-router-dom";

export default function Header({list}) {
  return (
    <div className="flex justify-between px-4 py-6 w-full backdrop-blur-md fixed">
        <h1 className="font-black text-3xl text-white w-2/12"><span className="text-green-500">A&F</span> Games</h1>
        <ul className=" text-white flex justify-end items-center gap-4 w-8/12">
        {list.map((item, index) => (
          <li key={index}>
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
            <Link to="/login" className="bg-green-800 text-white font-bold py-2 px-4 rounded ml-3">Iniciar Sesión</Link>
        </ul>
    </div>
  )
}

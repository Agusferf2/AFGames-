import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

const MesasContext = createContext();

export const useMesas = () => useContext(MesasContext);

export const MesasProvider = ({ children }) => {
  const [mesas, setMesas] = useState([]);

  const cargarMesas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "mesas"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMesas(data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  const editarMesa = async (id, mesa) => {
    await updateDoc(doc(db, "mesas", id), mesa);
    setMesas(mesas.map(r => r.id === id ? { ...r, ...mesas } : r));
  };
  
  useEffect(() => {
    cargarMesas();
  }, []);

  return (
    <MesasContext.Provider value={{ mesas, editarMesa }}>
      {children}
    </MesasContext.Provider>
  );
};

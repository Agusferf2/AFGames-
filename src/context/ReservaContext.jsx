import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

const ReservaContext = createContext();

export const useReservas = () => useContext(ReservaContext);

export const ReservaProvider = ({ children }) => {
  const [reservas, setReservas] = useState([]);

  const cargarReservas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "reservas"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservas(data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  const agregarReserva = async (reserva) => {
    const docRef = await addDoc(collection(db, "reservas"), reserva);
    setReservas([...reservas, { id: docRef.id, ...reserva }]);
  };

  const eliminarReserva = async (id) => {
    await deleteDoc(doc(db, "reservas", id));
    setReservas(reservas.filter(r => r.id !== id));
  };

  const editarReserva = async (id, reserva) => {
    await updateDoc(doc(db, "reservas", id), reserva);
    setReservas(reservas.map(r => r.id === id ? { ...r, ...reserva } : r));
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  return (
    <ReservaContext.Provider value={{ reservas, agregarReserva, eliminarReserva, editarReserva }}>
      {children}
    </ReservaContext.Provider>
  );
};

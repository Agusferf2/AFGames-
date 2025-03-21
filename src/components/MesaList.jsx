import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { addHours, isAfter } from "date-fns";

function MesasList() {
  const [mesas, setMesas] = useState([]);

  // Obtener las mesas desde Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "mesas"), (snapshot) => {
      setMesas(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); 
  }, []);
  
  // Verificar y actualizar el estado de las mesas si pasa el tiempo definido
  useEffect(() => {
    const verificarMesas = async () => {
      const ahora = new Date();

      mesas.forEach(async (mesa) => {
        if (mesa.estado === "ocupada" && mesa.finOcupacion) {
          const finOcupacion = new Date(mesa.finOcupacion.seconds * 1000); // Convertir Firestore Timestamp a Date
          
          if (isAfter(ahora, finOcupacion)) {
            console.log(`🚨 Turno terminado para mesa ${mesa.id}`);
            
            const mesaRef = doc(db, "mesas", String(mesa.id));
            await updateDoc(mesaRef, {
              estado: "disponible",
              inicioOcupacion: null,
              finOcupacion: null,
            });
          }
        }
      });
    };

    const interval = setInterval(verificarMesas, 60000);

    return () => clearInterval(interval); 
  }, [mesas]); 

  // Función para cambiar el estado de una mesa
  const cambiarEstado = async (id, estadoActual) => {
    try {
      const mesaRef = doc(db, "mesas", String(id));
      const nuevoEstado =
        estadoActual === "disponible" ? "ocupada" : "disponible";

      if (nuevoEstado === "ocupada") {
        const inicioOcupacion = new Date();
        const finOcupacion = addHours(inicioOcupacion, 1);
        await updateDoc(mesaRef, {
          estado: nuevoEstado,
          inicioOcupacion: serverTimestamp(),
          finOcupacion: finOcupacion,
        });
      } else {
        await updateDoc(mesaRef, {
          estado: nuevoEstado,
          inicioOcupacion: null,
          finOcupacion: null,
        });
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  return (
    <div>
      <h2>Disponibilidad de Mesas</h2>
      <ul>
        {mesas.map((mesa) => (
          <li key={mesa.id}>
            Mesa {mesa.id}: {mesa.estado}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => cambiarEstado(mesa.id, mesa.estado)}
            >
              {mesa.estado === "disponible" ? "Ocupar" : "Liberar"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MesasList;

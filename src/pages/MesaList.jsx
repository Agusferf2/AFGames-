import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { isAfter } from "date-fns";
import Header from "../components/Header";
import MesasCard from "../components/MesasCard";
import Footer from "../components/Footer";

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

  return (
    <div className="bg-gray-900">
      <Header
        list={[
          { label: "Inicio", url: "/home" },
          { label: "Disponibilidad", url: "/mesas" },
        ]}
      />
      <div className="pt-20">
        <h2 className="text-4xl font-bold mb-4 text-white text-center max-lg:text-3xl">
          Disponibilidad de Mesas
        </h2>
        <hr className="border-t-4 border-green-800 mb-4 w-3/12 mx-auto" />
        <div className="grid grid-cols-3 w-full justify-items-center max-lg:grid-cols-2 max-sm:grid-cols-1">
          {mesas.map((mesa) => (
            <MesasCard key={mesa.id} mesa={mesa} />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MesasList;

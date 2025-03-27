import { db, auth } from "../../config/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { addHours } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";

export default function MesasCard(props) {
  const [user] = useAuthState(auth);

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
    <div className="flex w-80 m-10 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md max-sm:w-72">
      <img
        src={props.mesa.img}
        className="mx-4 -mt-6 h-40 rounded-xl bg-cover shadow-xl"
      ></img>
      <div className="p-6">
        <h5 className="mb-2 block font-Kanit text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {props.mesa.nombre}
        </h5>
        {props.mesa.estado==="ocupada" ? <p className="bg-red-200 rounded-2xl p-2 text-center my-2">Estado: Ocupado</p>: <p className="bg-green-200 rounded-2xl p-2 text-center my-2">Estado: Disponible</p>}
        <p className="bg-gray-300 rounded-2xl p-2 text-center">
          El turno termina a las:{" "}
          {!props.mesa.finOcupacion
            ? "-"
            : new Date(props.mesa.finOcupacion.seconds * 1000)
                .getHours()
                .toString()
                .padStart(2, "0") +
              ":" +
              new Date(props.mesa.finOcupacion.seconds * 1000)
                .getMinutes()
                .toString()
                .padStart(2, "0")}
        </p>
      </div>
      <div className="p-6 pt-0">
        {user ? (
        <button
          type="button"
          onClick={() => cambiarEstado(props.mesa.id, props.mesa.estado)}
          className="select-none rounded-lg bg-green-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          {props.mesa.estado === "disponible" ? "Ocupar" : "Liberar"}
        </button>): null}
      </div>
    </div>
  );
}

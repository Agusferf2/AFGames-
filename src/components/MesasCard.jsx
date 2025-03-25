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
    <div className="flex w-80 m-10 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <img
        src={props.mesa.img}
        className="mx-4 -mt-6 h-40 rounded-xl shadow-xl"
      ></img>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {props.mesa.nombre}
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          Estado: {props.mesa.estado}
        </p>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
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
          data-ripple-light="true"
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

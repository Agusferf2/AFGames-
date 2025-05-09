import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { addHours } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { useReservas } from "../context/ReservaContext";
import { useMesas } from "../context/MesasContext";

export default function Turnos() {
  const { agregarReserva } = useReservas();
  const { mesas } = useMesas();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [mesa, setMesa] = useState("");
  const [turnosDisponibles, setTurnosDisponibles] = useState([]);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState("");

  const generarHorarios = () => {
    const horarios = [];
    for (let h = 9; h <= 18; h++) {
      const hora = h.toString().padStart(2, "0") + ":00";
      horarios.push(hora);
    }
    return horarios;
  };

  useEffect(() => {
    const fetchReservas = async () => {
      if (!fecha || !mesa) return;

      try {
        const inicioDia = new Date(`${fecha}T00:00`);
        const finDia = new Date(`${fecha}T23:59`);

        const ref = collection(db, "reservas");
        const q = query(
          ref,
          where("mesa", "==", mesa),
          where("inicioOcupacion", ">=", Timestamp.fromDate(inicioDia)),
          where("inicioOcupacion", "<=", Timestamp.fromDate(finDia))
        );

        const snapshot = await getDocs(q);
        const ocupados = snapshot.docs.map((doc) => {
          const date = doc.data().inicioOcupacion.toDate(); // Convertir Timestamp a Date
          return date.toTimeString().slice(0, 5); // Formato "HH:MM"
        });

        const todos = generarHorarios();
        const disponibles = todos.filter(
          (horaInicio) => !ocupados.includes(horaInicio)
        );
        setTurnosDisponibles(disponibles);
      } catch (error) {
        console.error("Error al traer las reservas:", error);
      }
    };

    fetchReservas();
  }, [fecha, mesa]);

  const submitReserva = async (e) => {
    e.preventDefault();
    const fechaHoraStr = `${fecha}T${turnoSeleccionado}`;
    const fechaHoraDate = new Date(fechaHoraStr);
    try {
      const nuevaReserva = {
        clienteNombre: nombre,
        clienteEmail: email,
        mesa: mesa,
        inicioOcupacion: Timestamp.fromDate(fechaHoraDate),
        finOcupacion: Timestamp.fromDate(addHours(fechaHoraDate, 1)),
        estado: "Sin confirmar",
      };
      agregarReserva(nuevaReserva);
      alert("¡Reserva realizada con éxito!");
      setEmail("");
      setNombre("");
      setMesa("");
      setFecha("");
      setTurnoSeleccionado("");
    } catch (error) {
      console.error("Error al guardar la reserva:", error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Añadir Reserva
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Fecha</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Mesa</label>
            <select
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
              value={mesa}
              onChange={(e) => setMesa(e.target.value)}
            >
              <option value="">Seleccionar mesa</option>
              {mesas.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Horario</label>
            <select
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
              value={turnoSeleccionado}
              onChange={(e) => setTurnoSeleccionado(e.target.value)}
            >
              <option value="">Seleccionar horario</option>
              {turnosDisponibles.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </div>

          {turnoSeleccionado && (
            <div className="text-sm text-gray-300 mt-2">
              Reservarás el <strong>{fecha}</strong> a las{" "}
              <strong>{turnoSeleccionado}</strong>
            </div>
          )}

          <button
            onClick={submitReserva}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 mt-4 rounded font-semibold"
            disabled={
              !nombre || !email || !mesa || !fecha || !turnoSeleccionado
            }
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}

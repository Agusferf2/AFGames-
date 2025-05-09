import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useReservas } from "../context/ReservaContext";
import { useMesas } from "../context/MesasContext";

export default function Dashboard() {
  const { reservas, eliminarReserva, editarReserva } = useReservas();
  const { mesas, editarMesa } = useMesas();

  const [busqueda, setBusqueda] = useState("");
  const [fechaFiltro, setfechaFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");

  const reservasFiltradas = reservas.filter((reserva) => {
    const texto = busqueda.toLowerCase();
    if (texto) {
      return (
        reserva.clienteNombre.toLowerCase().includes(texto) ||
        reserva.clienteEmail.toLowerCase().includes(texto)
      );
    } else {
      return true;
    }
  });

  const reservasFiltradasPorFecha = reservasFiltradas.filter((reserva) => {
    if (fechaFiltro) {
      return reserva.inicioOcupacion
        .toDate()
        .toISOString()
        .split("T")[0]
        .includes(fechaFiltro);
    } else {
      return true;
    }
  });

  const reservasFiltradasPorEstado = reservasFiltradasPorFecha.filter(
    (reserva) => {
      if (estadoFiltro) {
        return reserva.estado.includes(estadoFiltro);
      } else {
        return true;
      }
    }
  );

  return (
    <div className="p-6 space-y-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reservas</h1>
        <Link to="/turnos">
          <Button
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 p-0"
          >
            + Añadir reserva
          </Button>
        </Link>
      </div>
      <p className="text-gray-400">
        Ve y maneja tus reservas de manera eficiente
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <TextField
          label="Buscar reservas..."
          variant="filled"
          sx={{
            input: { color: "white" },
            label: { color: "gray" },
          }}
          className="w-1/2"
          size="small"
          onChange={(e) => {
            setBusqueda(e.target.value);
          }}
        />
        <div className="flex gap-2 items-center">
          <input
            type="date"
            className="bg-gray-800 text-gray-200 rounded-lg p-4 hover:border border-black"
            onChange={(e) => {
              setfechaFiltro(e.target.value);
            }}
          />
          <FormControl
            sx={{ m: 1, minWidth: 200 }}
            className="bg-gray-800 border border-gray-700 text-gray-400 rounded-lg"
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: "lightgray" }}
            >
              Filtrar por Estado
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Filtrar por estado"
              sx={{ color: "lightgray" }}
              onChange={(e) => {
                setEstadoFiltro(e.target.value);
              }}
            >
              <MenuItem value="">----</MenuItem>
              <MenuItem value="Sin confirmar">Sin Confirmar</MenuItem>
              <MenuItem value="confirmada">Confirmados</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Email</th>
              <th className="p-3">Mesa</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Hora</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservasFiltradasPorEstado.map((reserva, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800"
              >
                <td className="p-3">{reserva.clienteNombre}</td>
                <td className="p-3">{reserva.clienteEmail}</td>
                <td className="p-3">
                  {mesas.find((mesa) => mesa.id == reserva.mesa)?.nombre}
                </td>
                <td className="p-3">
                  {reserva.inicioOcupacion.toDate().toLocaleDateString()}
                </td>
                <td className="p-3">
                  {reserva.inicioOcupacion.toDate().toLocaleTimeString()}
                </td>
                <td className="p-3">
                  <span
                    className={`text-white text-sm px-3 py-1 rounded-full ${
                      reserva.estado == "confirmada"
                        ? "bg-green-700"
                        : "bg-yellow-700"
                    }`}
                  >
                    {reserva.estado.toUpperCase()}
                  </span>
                </td>
                <td className="p-3">
                  <Button
                    sx={{ backgroundColor: "darkgreen", color: "white", mr: 2 }}
                    onClick={() => {
                      const mesaId = mesas.find(
                        (mesa) => mesa.id == reservas[index].mesa
                      ).id;
                      if (reservas[index].estado != "confirmada") {                        
                        editarMesa(mesaId.toString(), { estado: "ocupada", inicioOcupacion: reservas[index].inicioOcupacion, finOcupacion: reservas[index].finOcupacion });
                        editarReserva(reservas[index].id, {
                          estado: "confirmada",
                        });
                      }
                    }}
                  >
                    Confirmar
                  </Button>
                  <Button
                    sx={{ backgroundColor: "darkred", color: "white", mr: 2 }}
                    onClick={() => {
                      const reserva = reservas[index];
                      eliminarReserva(reserva.id);
                    }}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

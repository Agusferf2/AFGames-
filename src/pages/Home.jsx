import { Link } from "react-router-dom";
import Header from "../components/Header";
import imgs from "../assets/background-billar.jpg";
import ServiceCard from "../components/ServiceCard";
import Testimonials from "../components/Testimonios.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <div className="w-full h-[90vh]">
      <Header
        list={[
          { label: "Inicio", url: "#inicio" },
          { label: "Disponibilidad", url: "/mesas" },
          { label: "Servicios", url: "#servicios" },
          { label: "Testimonios", url: "#testimonios" },
        ]}
      />
      <section
        id="inicio"
        className="w-full h-full bg-cover bg-center flex justify-center flex-col gap-5 items-start p-10 max-sm:items-center max-sm:text-center max-sm:h-[80vh]"
        style={{ backgroundImage: `url(${imgs})` }}
      >
        <h1 className="font-Kanit text-5xl font-bold text text-white max-sm:text-4xl">
          Bienvenido a <span className="text-green-500">A&F Games</span>
        </h1>
        <p className="text-xl max-w-2xl text-white max-sm:text-lg ">
          Disfruta de un ambiente único para jugar billar con amigos. Consulta
          la disponibilidad de mesas en tiempo real.
        </p>
        <div className="flex gap-3">
          <Link
            to="/mesas"
            className="bg-green-800 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition max-sm:text-sm"
          >
            Ver disponibilidad de mesas
          </Link>
        </div>
      </section>
      <ServiceCard />
      <hr className="border-gray-600 w-1/2 mx-auto my-1" />
      <Testimonials />
      <section class="bg-cover bg-center bg-[url('/images/reserva.jpg')] pb-10 text-white text-center">
        <div class="bg-[#1e29392b] bg-opacity-60 py-12 px-6 max-w-2xl mx-auto rounded-2xl shadow-lg">
          <h2 class="text-4xl font-bold mb-4">¡Reservá tu lugar hoy!</h2>
          <p class="text-lg mb-6">
            Viví una experiencia única. Elegí la fecha y hora que más te
            convenga, y asegurá tu mesa en segundos.
          </p>
          <Link
            to="/turnos"
            class="inline-block bg-green-800 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
          >
            RESERVAR AHORA
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

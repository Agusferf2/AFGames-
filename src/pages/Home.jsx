import { Link } from "react-router-dom";
import Header from '../components/Header'
import imgs from '../assets/background-billar.jpg'
import ServiceCard from '../components/ServiceCard';

export default function Home() {
  return (
    <div className='w-full h-[90vh] bg-cover bg-center' style={{ backgroundImage: `url(${imgs})` }}>
      <Header list={[
        { label: "Inicio", url: "#inicio" },
        { label: "Disponibilidad", url: "/mesas" },
        { label: "Servicios", url: "#servicios" },  
        { label: "Contacto", url: "#contacto" }
      ]}/>
      <section id="Inicio" className='w-full h-full flex justify-center flex-col gap-5 items-start p-10'>
        <h1 className='font-Kanit text-5xl font-bold text text-white'>Bienvenido a <span className='text-green-500'>A&F Games</span></h1>
        <p className="text-5xl md:text-xl max-w-2xl text-white">Disfruta de un ambiente único para jugar billar con amigos. Consulta la disponibilidad de mesas en tiempo real.</p>
        <Link to="/mesas" className="bg-green-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition">
          Ver disponibilidad de mesas
        </Link>
      </section>
        <ServiceCard />
    </div>
    
  )
}

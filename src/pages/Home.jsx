import { Link } from "react-router-dom";
import Header from '../components/Header'
import imgs from '../assets/background-billar.jpg'
import ServiceCard from '../components/ServiceCard';
import Testimonials from '../components/Testimonios.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <div className='w-full h-[90vh]' >
      <Header list={[
        { label: "Inicio", url: "#inicio" },
        { label: "Disponibilidad", url: "/mesas" },
        { label: "Servicios", url: "#servicios" },  
        { label: "Testimonios", url: "#testimonios" }
      ]}/>
      <section id="inicio" className='w-full h-full bg-cover bg-center flex justify-center flex-col gap-5 items-start p-10 max-sm:items-center max-sm:text-center max-sm:h-[80vh]' style={{ backgroundImage: `url(${imgs})`}}>
        <h1 className='font-Kanit text-5xl font-bold text text-white max-sm:text-4xl'>Bienvenido a <span className='text-green-500'>A&F Games</span></h1>
        <p className="text-xl max-w-2xl text-white max-sm:text-lg ">Disfruta de un ambiente único para jugar billar con amigos. Consulta la disponibilidad de mesas en tiempo real.</p>
        <Link to="/mesas" className="bg-green-800 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition max-sm:text-sm">
          Ver disponibilidad de mesas
        </Link>
      </section>
        <ServiceCard />
        <hr className="border-gray-600 w-1/2 mx-auto my-1" />
        <Testimonials />
        <Footer />
    </div>
    
  )
}

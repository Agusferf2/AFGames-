export default function Testimonials() {
    const testimonials = [      
      {
        name: "Sebastián Ríos",
        role: "Gamer de FIFA y Mortal Kombat",
        image: "https://randomuser.me/api/portraits/men/12.jpg",
        text: "Los torneos de PlayStation aquí son lo mejor. Siempre hay buena competencia y la organización es excelente. Se nota que saben lo que hacen. ¡Volveré por más victorias!"
      },
      {
        name: "Lucas Méndez",
        role: "Aficionado al Billar",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "Un lugar increíble para jugar billar con amigos. Las mesas están en excelente estado, y siempre hay un buen ambiente. Además, organizan torneos con premios geniales. ¡Súper recomendado!"
      },
      {
        name: "Adriana Fernández",
        role: "Campeona de Metegol",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
        text: "Los torneos de metegol son épicos. Siempre hay jugadores buenísimos y el nivel es alto. Si te gusta competir o simplemente pasar un buen rato, este es el lugar ideal."
      }
    ];
  
    return (
      <section id="testimonios" className="bg-gray-900 text-white py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-green-400 text-lg font-semibold">TESTIMONIOS</h2>
          <h3 className="text-2xl font-bold mt-2">QUE DICEN DE NOSOTROS</h3>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8 flex-wrap ">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg text-center w-80 max-sm:w-10/12">
              <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
              <div className="flex justify-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-green-700"
                />
              </div>
              <h4 className="text-lg font-semibold mt-4">{testimonial.name}</h4>
              <p className="text-green-400">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
import { CupSoda, Trophy, CigaretteOff } from "lucide-react";

export default function ServiceCard() {
  return (
    <section id="servicios" className="text-center py-12 px-6 bg-gray-900">
      <h4 className="text-sm uppercase text-green-500 font-semibold tracking-wider">
        Sobre nosotros
      </h4>
      <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
        "Mesas de calidad y un <br />ambiente ideal para jugar"
      </h2>
      <p className="text-gray-400  max-w-2xl mx-auto mt-4">
        Ofrecemos todo tipo de juegos para que puedas divertirte con tus amigos y familiares. Como billares, xbox, juegos de mesa y más.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <FeatureCard
          icon={<CupSoda className="text-green-500 w-10 h-10 mx-auto" />}
          title="Snacks y bebidas"
          description="Te ofrecemos todo tipo de snacks y bebidas para que puedas disfrutar de tu experiencia de juego."
        />
        <FeatureCard
          icon={<Trophy className="text-green-500 w-10 h-10 mx-auto" />}
          title="Torneos y eventos especiales"
          description="Organizamos torneos y eventos especiales para que puedas competir con tus amigos y familiares."
        />
        <FeatureCard
          icon={<CigaretteOff className="text-green-500 w-10 h-10 mx-auto" />}
          title="Local libre de tabaco y alcohol"
          description="Buscamos tener un ambiente familiar y amigable, libre de problemas."
        />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="text-center max-md:mx-10">
      {icon}
      <h3 className="text-xl font-semibold text-white mt-4">{title}</h3>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
}

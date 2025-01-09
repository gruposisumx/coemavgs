import React from 'react';
import { BookHeart, Brain, Heart, Sparkles } from 'lucide-react';

export function Home() {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-6">
            Juntas Somos Más Fuertes
          </h1>
          <p className="text-xl text-purple-700 mb-8 max-w-2xl mx-auto">
            Un espacio seguro para sanar, crecer y empoderarte. Encuentra apoyo, recursos y una comunidad que te comprende.
          </p>
          <a
            href="/recursos"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Descubre Nuestros Recursos
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
            ¿Qué Ofrecemos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Heart className="w-12 h-12 text-purple-600" />}
              title="Apoyo Emocional"
              description="Encuentra comprensión y apoyo en nuestra comunidad de mujeres que comparten experiencias similares."
            />
            <FeatureCard
              icon={<Brain className="w-12 h-12 text-purple-600" />}
              title="Recursos Profesionales"
              description="Accede a herramientas y recursos desarrollados por expertos en salud mental."
            />
            <FeatureCard
              icon={<BookHeart className="w-12 h-12 text-purple-600" />}
              title="Diario Personal"
              description="Lleva un registro privado de tu proceso de sanación y crecimiento personal."
            />
            <FeatureCard
              icon={<Sparkles className="w-12 h-12 text-purple-600" />}
              title="Testimonios Inspiradores"
              description="Conoce historias de superación que te motivarán en tu propio camino."
            />
          </div>
        </div>
      </section>

      {/* Daily Insight Section */}
      <section className="py-16 px-4 bg-purple-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-8">
            Dato del Día
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg text-purple-800 leading-relaxed">
              "La recuperación emocional es un proceso gradual. Cada pequeño paso cuenta y es importante celebrar cada victoria, por pequeña que parezca."
            </p>
            <p className="mt-4 text-purple-600 font-semibold">
              - Dra. María González, Psicóloga Especialista
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-purple-900 mb-3">
        {title}
      </h3>
      <p className="text-purple-700">
        {description}
      </p>
    </div>
  );
}
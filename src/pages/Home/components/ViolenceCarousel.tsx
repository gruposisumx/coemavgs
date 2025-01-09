import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const violenceTypes = [
  {
    title: 'Violencia Física',
    description: 'Incluye golpes, empujones, y cualquier forma de agresión que dañe tu cuerpo.',
    signs: [
      'Moretones inexplicables',
      'Fracturas o lesiones frecuentes',
      'Marcas de agresión visible'
    ]
  },
  {
    title: 'Violencia Psicológica',
    description: 'Manipulación emocional, humillaciones y control psicológico.',
    signs: [
      'Amenazas constantes',
      'Insultos y humillaciones',
      'Aislamiento social'
    ]
  },
  {
    title: 'Violencia Económica',
    description: 'Control sobre tus recursos económicos y decisiones financieras.',
    signs: [
      'Control excesivo de gastos',
      'Prohibición de trabajar',
      'Apropiación de ingresos'
    ]
  }
];

export function ViolenceCarousel() {
  return (
    <div className="bg-purple-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
          Tipos de Violencia
        </h2>
        
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {violenceTypes.map((type) => (
            <SwiperSlide key={type.title}>
              <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                <h3 className="text-xl font-bold text-purple-900 mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-700 mb-4">{type.description}</p>
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">Señales de alerta:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {type.signs.map((sign) => (
                      <li key={sign}>{sign}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
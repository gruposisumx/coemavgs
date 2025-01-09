import React from 'react';
import { Heart, Shield, Users, Sparkles } from 'lucide-react';
import { CarouselSlide } from './CarouselSlide';
import { CarouselControls } from './CarouselControls';
import { useErrorBoundary } from '../../../hooks/useErrorBoundary';

const slides = [
  {
    title: "Apoyo Emocional Integral",
    description: "COEMAV es un espacio seguro donde las mujeres encuentran apoyo profesional y comprensión para superar situaciones difíciles.",
    icon: Heart,
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Protección y Seguridad",
    description: "Proporcionamos recursos y herramientas para garantizar la seguridad y bienestar de cada mujer que busca nuestra ayuda.",
    icon: Shield,
    imageUrl: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Comunidad de Apoyo",
    description: "Construimos una red de apoyo donde las mujeres pueden compartir experiencias y encontrar fortaleza en la unidad.",
    icon: Users,
    imageUrl: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Empoderamiento",
    description: "Facilitamos herramientas y conocimientos para que cada mujer pueda reconstruir su vida y alcanzar su máximo potencial.",
    icon: Sparkles,
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
  }
];

export function AboutCarousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const { ErrorBoundary } = useErrorBoundary();

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  React.useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ErrorBoundary>
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="relative h-[500px]">
            {slides.map((slide, index) => (
              <CarouselSlide
                key={index}
                {...slide}
                isActive={currentSlide === index}
              />
            ))}

            <CarouselControls
              currentSlide={currentSlide}
              totalSlides={slides.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onDotClick={setCurrentSlide}
            />
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
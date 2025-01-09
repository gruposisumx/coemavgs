import React from 'react';
import { Contact } from 'lucide-react';
import { ContactFormModal } from './ContactFormModal';

interface Professional {
  id: string;
  name: string;
  image_url: string;
  bio: string;
  years_experience: number;
  specialties: string[];
}

interface Props {
  professional: Professional;
}

export function ProfessionalCard({ professional }: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img 
        src={professional.image_url} 
        alt={professional.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-purple-900 mb-2">{professional.name}</h3>
        <p className="text-gray-600 mb-4">{professional.bio}</p>
        
        <div className="mb-4">
          <p className="text-purple-700 font-semibold">
            {professional.years_experience} años de experiencia
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Especialidades:</h4>
          <div className="flex flex-wrap gap-2">
            {professional.specialties.map((specialty) => (
              <span 
                key={specialty}
                className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Contact className="w-5 h-5" />
          Contactar
        </button>
      </div>

      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        professionalId={professional.id}
        professionalName={professional.name}
      />
    </div>
  );
}
import React from 'react';
import { ProfessionalCard } from '../../components/professionals/ProfessionalCard';
import { supabase } from '../../lib/supabase';

interface Professional {
  id: string;
  name: string;
  image_url: string;
  bio: string;
  years_experience: number;
  specialties: string[];
}

export function ProfessionalsPage() {
  const [professionals, setProfessionals] = React.useState<Professional[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProfessionals() {
      try {
        const { data, error } = await supabase
          .from('professionals')
          .select('*');
        
        if (error) throw error;
        setProfessionals(data || []);
      } catch (error) {
        console.error('Error fetching professionals:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfessionals();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center">
        Nuestro Equipo de Profesionales
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professionals.map((professional) => (
          <ProfessionalCard
            key={professional.id}
            professional={professional}
          />
        ))}
      </div>
    </div>
  );
}
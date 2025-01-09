import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useSupabaseQuery } from '../../../hooks/useSupabaseQuery';
import { Button } from '../../ui/Button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Appointment {
  id: string;
  professional: {
    name: string;
    speciality: string;
    image_url: string;
  };
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export function AppointmentList() {
  const { data: appointments, loading } = useSupabaseQuery<Appointment>('appointments');

  if (loading) {
    return <div className="animate-pulse">Cargando citas...</div>;
  }

  return (
    <div className="space-y-4">
      {appointments?.map((appointment) => (
        <div key={appointment.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-start gap-4">
            <img
              src={appointment.professional.image_url}
              alt={appointment.professional.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium">{appointment.professional.name}</h3>
              <p className="text-sm text-gray-500">{appointment.professional.speciality}</p>
              
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {format(new Date(appointment.date), "d 'de' MMMM, yyyy", { locale: es })}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {appointment.time}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {appointment.location}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {appointment.status === 'confirmed' && 'Confirmada'}
                {appointment.status === 'pending' && 'Pendiente'}
                {appointment.status === 'completed' && 'Completada'}
                {appointment.status === 'cancelled' && 'Cancelada'}
              </span>
              
              {appointment.status === 'pending' && (
                <Button variant="secondary" size="sm">
                  Cancelar cita
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
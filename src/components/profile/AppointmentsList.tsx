import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery';
import { useAuth } from '../../hooks/useAuth';

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

export function AppointmentsList() {
  const { user } = useAuth();
  const { data: appointments, loading } = useSupabaseQuery<Appointment>(
    'appointments',
    {
      select: `
        id,
        date,
        time,
        location,
        status,
        professional:professionals(name, speciality, image_url)
      `,
      filter: { user_id: user?.id },
      orderBy: { column: 'date', ascending: true }
    }
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!appointments?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tienes citas programadas</p>
        <a 
          href="/profesionales" 
          className="text-primary-600 hover:text-primary-500 font-medium"
        >
          Agenda una cita con nuestros profesionales
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="bg-white rounded-lg shadow-sm border p-4"
        >
          <div className="flex items-start gap-4">
            <img
              src={appointment.professional.image_url}
              alt={appointment.professional.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">
                {appointment.professional.name}
              </h4>
              <p className="text-sm text-gray-500">
                {appointment.professional.speciality}
              </p>
              
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {format(new Date(appointment.date), "d 'de' MMMM, yyyy", { locale: es })}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {appointment.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {appointment.location}
                </div>
              </div>
            </div>
            
            <span className={`px-2 py-1 rounded-full text-sm ${
              appointment.status === 'confirmed'
                ? 'bg-green-100 text-green-800'
                : appointment.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : appointment.status === 'cancelled'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {appointment.status === 'confirmed' && 'Confirmada'}
              {appointment.status === 'pending' && 'Pendiente'}
              {appointment.status === 'completed' && 'Completada'}
              {appointment.status === 'cancelled' && 'Cancelada'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
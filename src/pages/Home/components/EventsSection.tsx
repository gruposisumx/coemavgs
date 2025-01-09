import React from 'react';
import { useSupabaseQuery } from '../../../hooks/useSupabaseQuery';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  image_url: string;
}

export function EventsSection() {
  const { data: events, loading } = useSupabaseQuery<Event>('events', {
    orderBy: { column: 'event_date', ascending: true },
    limit: 3
  });

  if (loading) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
          Eventos y Talleres
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.map((event) => (
            <div key={event.id} className="bg-purple-50 rounded-lg overflow-hidden shadow-lg">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="space-y-2 text-sm text-purple-700">
                  <p>
                    📅 {format(new Date(event.event_date), "d 'de' MMMM, yyyy", { locale: es })}
                  </p>
                  <p>📍 {event.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
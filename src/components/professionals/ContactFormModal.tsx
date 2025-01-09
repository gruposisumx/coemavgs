import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

const DEFAULT_CONTACT_EMAIL = 'gruposisumx@gmail.com';

const contactSchema = z.object({
  problem_description: z.string().min(10, 'Por favor describe tu situación'),
  preferred_contact_time: z.string().min(1, 'Selecciona un horario'),
  contact_info: z.object({
    phone: z.string().min(10, 'Ingresa un teléfono válido'),
    email: z.string().email('Ingresa un email válido')
  })
});

type ContactForm = z.infer<typeof contactSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  professionalId: string;
  professionalName: string;
}

export function ContactFormModal({ isOpen, onClose, professionalId, professionalName }: Props) {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactForm, isEmergency = false) => {
    if (!user) return;

    try {
      // Guardar en Supabase
      const { error } = await supabase.from('contact_requests').insert({
        user_id: user.id,
        professional_id: professionalId,
        ...data,
        is_emergency: isEmergency,
        contact_email: DEFAULT_CONTACT_EMAIL // Siempre usar el email por defecto
      });

      if (error) throw error;
      onClose();
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-900">
            Contactar a {professionalName}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit((data) => onSubmit(data, false))}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Describe tu problema
              </label>
              <textarea
                {...register('problem_description')}
                className="w-full rounded-lg border-gray-300 shadow-sm"
                rows={4}
              />
              {errors.problem_description && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.problem_description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ¿En qué horario te podemos contactar?
              </label>
              <select
                {...register('preferred_contact_time')}
                className="w-full rounded-lg border-gray-300 shadow-sm"
              >
                <option value="">Selecciona un horario</option>
                <option value="morning">Mañana (9:00 - 12:00)</option>
                <option value="afternoon">Tarde (12:00 - 17:00)</option>
                <option value="evening">Noche (17:00 - 20:00)</option>
              </select>
              {errors.preferred_contact_time && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.preferred_contact_time.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Déjanos tus datos
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  {...register('contact_info.phone')}
                  className="w-full rounded-lg border-gray-300 shadow-sm"
                />
                {errors.contact_info?.phone && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.contact_info.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register('contact_info.email')}
                  className="w-full rounded-lg border-gray-300 shadow-sm"
                />
                {errors.contact_info?.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.contact_info.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Enviar
              </button>
              <button
                type="button"
                onClick={() => onSubmit({
                  problem_description: 'EMERGENCIA',
                  preferred_contact_time: 'immediate',
                  contact_info: {
                    phone: user?.phone || '',
                    email: user?.email || ''
                  }
                }, true)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Tengo una emergencia
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
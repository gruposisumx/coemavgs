import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Por favor ingresa tu nombre'),
  email: z.string().email('Por favor ingresa un email válido'),
  message: z.string().min(10, 'Por favor escribe un mensaje más largo')
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactForm) => {
    // Aquí iría la lógica para enviar el mensaje
    console.log(data);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
          Contáctanos
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-purple-900 mb-6">
              Información de Contacto
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="text-purple-600 w-5 h-5" />
                <span>+1 234 567 890</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="text-purple-600 w-5 h-5" />
                <span>contacto@coemav.org</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="text-purple-600 w-5 h-5" />
                <span>Av. Principal #123, Ciudad</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('name')}
                placeholder="Tu nombre"
                className="w-full rounded-lg border-gray-300 shadow-sm"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Tu email"
                className="w-full rounded-lg border-gray-300 shadow-sm"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <textarea
                {...register('message')}
                placeholder="Tu mensaje"
                rows={4}
                className="w-full rounded-lg border-gray-300 shadow-sm"
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
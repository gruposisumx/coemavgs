import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileUploader } from '../../staff/ResourceManager/FileUploader';
import { Input } from '../../ui/Input';
import { TextArea } from '../../ui/TextArea';
import { Button } from '../../ui/Button';

const profileSchema = z.object({
  displayName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  bio: z.string().max(500, 'La biografía no debe exceder los 500 caracteres'),
  avatar: z.string().url().optional(),
  location: z.string().optional(),
  interests: z.array(z.string()),
  socialLinks: z.object({
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
    linkedin: z.string().url().optional()
  }),
  notifications: z.object({
    email: z.boolean(),
    blog: z.boolean(),
    events: z.boolean(),
    messages: z.boolean()
  }),
  privacy: z.object({
    showEmail: z.boolean(),
    showLocation: z.boolean(),
    showSocial: z.boolean()
  })
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface Props {
  onSubmit: (data: ProfileFormData) => Promise<void>;
  initialData?: Partial<ProfileFormData>;
}

export function ProfileEditor({ onSubmit, initialData }: Props) {
  const { register, handleSubmit, setValue } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      notifications: {
        email: true,
        blog: true,
        events: true,
        messages: true
      },
      privacy: {
        showEmail: false,
        showLocation: true,
        showSocial: true
      },
      ...initialData
    }
  });

  const handleAvatarUpload = (url: string) => {
    setValue('avatar', url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Información básica
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nombre para mostrar"
            {...register('displayName')}
          />

          <Input
            label="Ubicación"
            {...register('location')}
            placeholder="Ciudad, País"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Foto de perfil
        </label>
        <FileUploader
          onUpload={handleAvatarUpload}
          accept="image/*"
        />
      </div>

      <TextArea
        label="Biografía"
        {...register('bio')}
        rows={4}
        placeholder="Cuéntanos un poco sobre ti..."
      />

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Intereses
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            'Superación personal',
            'Meditación',
            'Arte terapia',
            'Ejercicio',
            'Lectura',
            'Escritura',
            'Yoga',
            'Música',
            'Naturaleza'
          ].map((interest) => (
            <label key={interest} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={interest}
                {...register('interests')}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span>{interest}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Redes sociales
        </h3>
        <div className="space-y-4">
          <Input
            label="Twitter"
            {...register('socialLinks.twitter')}
            placeholder="https://twitter.com/usuario"
          />
          <Input
            label="Instagram"
            {...register('socialLinks.instagram')}
            placeholder="https://instagram.com/usuario"
          />
          <Input
            label="LinkedIn"
            {...register('socialLinks.linkedin')}
            placeholder="https://linkedin.com/in/usuario"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Notificaciones
        </h3>
        <div className="space-y-2">
          {[
            { key: 'email', label: 'Correos generales' },
            { key: 'blog', label: 'Nuevas entradas del blog' },
            { key: 'events', label: 'Eventos próximos' },
            { key: 'messages', label: 'Mensajes directos' }
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register(`notifications.${key}`)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Privacidad
        </h3>
        <div className="space-y-2">
          {[
            { key: 'showEmail', label: 'Mostrar email' },
            { key: 'showLocation', label: 'Mostrar ubicación' },
            { key: 'showSocial', label: 'Mostrar redes sociales' }
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register(`privacy.${key}`)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          Guardar cambios
        </Button>
      </div>
    </form>
  );
}
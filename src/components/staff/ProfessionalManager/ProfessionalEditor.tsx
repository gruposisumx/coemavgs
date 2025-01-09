import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../../../lib/supabase';
import { Input } from '../../ui/Input';
import { TextArea } from '../../ui/TextArea';
import { Button } from '../../ui/Button';
import { FileUploader } from '../ResourceManager/FileUploader';

const professionalSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  specialties: z.array(z.string()).min(1, 'Agrega al menos una especialidad'),
  yearsExperience: z.number().min(0, 'Los años de experiencia son requeridos'),
  bio: z.string().min(100, 'La biografía debe tener al menos 100 caracteres'),
  imageUrl: z.string().url('URL de imagen inválida'),
  schedule: z.object({
    monday: z.array(z.string()),
    tuesday: z.array(z.string()),
    wednesday: z.array(z.string()),
    thursday: z.array(z.string()),
    friday: z.array(z.string())
  }),
  contactPreferences: z.object({
    email: z.boolean(),
    phone: z.boolean(),
    videoCall: z.boolean()
  })
});

type ProfessionalFormData = z.infer<typeof professionalSchema>;

interface Props {
  onSubmit: (data: ProfessionalFormData) => Promise<void>;
  initialData?: Partial<ProfessionalFormData>;
}

export function ProfessionalEditor({ onSubmit, initialData }: Props) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalSchema),
    defaultValues: initialData
  });

  const handleImageUpload = (url: string) => {
    setValue('imageUrl', url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nombre completo"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email profesional"
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Foto de perfil
        </label>
        <FileUploader
          onUpload={handleImageUpload}
          accept="image/*"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Especialidades
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['Trauma', 'Ansiedad', 'Depresión', 'Violencia', 'Autoestima', 'Duelo'].map((specialty) => (
            <label key={specialty} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={specialty}
                {...register('specialties')}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span>{specialty}</span>
            </label>
          ))}
        </div>
        {errors.specialties && (
          <p className="mt-1 text-sm text-red-600">{errors.specialties.message}</p>
        )}
      </div>

      <Input
        label="Años de experiencia"
        type="number"
        error={errors.yearsExperience?.message}
        {...register('yearsExperience', { valueAsNumber: true })}
      />

      <TextArea
        label="Biografía profesional"
        error={errors.bio?.message}
        {...register('bio')}
        rows={6}
      />

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Horario de atención</h3>
        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
          <div key={day} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <select
                {...register(`schedule.${day}`)}
                className="rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200"
              >
                <option value="">Selecciona horario</option>
                <option value="morning">Mañana (9:00 - 13:00)</option>
                <option value="afternoon">Tarde (14:00 - 18:00)</option>
                <option value="evening">Noche (19:00 - 21:00)</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preferencias de contacto</h3>
        <div className="space-y-2">
          {[
            { id: 'email', label: 'Email' },
            { id: 'phone', label: 'Teléfono' },
            { id: 'videoCall', label: 'Videollamada' }
          ].map(({ id, label }) => (
            <label key={id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register(`contactPreferences.${id}`)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <Button type="submit">
        {initialData ? 'Actualizar' : 'Registrar'} Profesional
      </Button>
    </form>
  );
}
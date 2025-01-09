import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileUploader } from '../../staff/ResourceManager/FileUploader';
import { Input } from '../../ui/Input';
import { TextArea } from '../../ui/TextArea';
import { Button } from '../../ui/Button';
import { RichTextEditor } from '../../staff/ResourceManager/RichTextEditor';

const eventSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  description: z.string().min(50, 'La descripción debe tener al menos 50 caracteres'),
  content: z.string().min(100, 'El contenido debe tener al menos 100 caracteres'),
  location: z.string().min(5, 'La ubicación es requerida'),
  date: z.string(),
  time: z.string(),
  duration: z.number().min(30, 'La duración mínima es de 30 minutos'),
  maxAttendees: z.number().min(1, 'Especifica el número máximo de asistentes'),
  imageUrl: z.string().url(),
  type: z.enum(['workshop', 'seminar', 'conference', 'support_group', 'other']),
  isOnline: z.boolean(),
  meetingUrl: z.string().url().optional(),
  registrationDeadline: z.string(),
  status: z.enum(['draft', 'published', 'cancelled'])
});

type EventFormData = z.infer<typeof eventSchema>;

interface Props {
  onSubmit: (data: EventFormData) => Promise<void>;
  initialData?: Partial<EventFormData>;
}

export function EventEditor({ onSubmit, initialData }: Props) {
  const { register, handleSubmit, watch, setValue, control } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      isOnline: false,
      ...initialData
    }
  });

  const isOnline = watch('isOnline');

  const handleImageUpload = (url: string) => {
    setValue('imageUrl', url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Título del evento"
        {...register('title')}
      />

      <TextArea
        label="Descripción corta"
        {...register('description')}
        rows={3}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Contenido detallado
        </label>
        <RichTextEditor
          value={watch('content') || ''}
          onChange={(content) => setValue('content', content)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Fecha"
            type="date"
            {...register('date')}
          />
        </div>
        <div>
          <Input
            label="Hora"
            type="time"
            {...register('time')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Duración (minutos)"
          type="number"
          {...register('duration', { valueAsNumber: true })}
        />
        <Input
          label="Máximo de asistentes"
          type="number"
          {...register('maxAttendees', { valueAsNumber: true })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagen del evento
        </label>
        <FileUploader
          onUpload={handleImageUpload}
          accept="image/*"
        />
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('isOnline')}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span>Evento en línea</span>
        </label>
      </div>

      {isOnline ? (
        <Input
          label="URL de la reunión"
          {...register('meetingUrl')}
          placeholder="https://zoom.us/j/..."
        />
      ) : (
        <Input
          label="Ubicación"
          {...register('location')}
          placeholder="Dirección completa del evento"
        />
      )}

      <select
        {...register('type')}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200"
      >
        <option value="workshop">Taller</option>
        <option value="seminar">Seminario</option>
        <option value="conference">Conferencia</option>
        <option value="support_group">Grupo de apoyo</option>
        <option value="other">Otro</option>
      </select>

      <Input
        label="Fecha límite de registro"
        type="date"
        {...register('registrationDeadline')}
      />

      <select
        {...register('status')}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200"
      >
        <option value="draft">Borrador</option>
        <option value="published">Publicado</option>
        <option value="cancelled">Cancelado</option>
      </select>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary">
          Guardar como borrador
        </Button>
        <Button type="submit">
          Publicar evento
        </Button>
      </div>
    </form>
  );
}
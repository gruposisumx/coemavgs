import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../ui/Input';
import { TextArea } from '../../ui/TextArea';
import { Button } from '../../ui/Button';

const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  maxAttendees: z.number().min(1),
  imageUrl: z.string().url()
});

type EventFormData = z.infer<typeof eventSchema>;

interface Props {
  onSubmit: (data: EventFormData) => Promise<void>;
  initialData?: Partial<EventFormData>;
}

export function EventForm({ onSubmit, initialData }: Props) {
  const { register, handleSubmit } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Título"
        {...register('title')}
      />

      <TextArea
        label="Descripción"
        {...register('description')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Fecha"
          type="date"
          {...register('date')}
        />

        <Input
          label="Hora"
          type="time"
          {...register('time')}
        />
      </div>

      <Input
        label="Ubicación"
        {...register('location')}
      />

      <Input
        label="Máximo de asistentes"
        type="number"
        {...register('maxAttendees', { valueAsNumber: true })}
      />

      <Input
        label="URL de imagen"
        {...register('imageUrl')}
      />

      <Button type="submit">
        {initialData ? 'Actualizar' : 'Crear'} Evento
      </Button>
    </form>
  );
}
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { TextArea } from '../ui/TextArea';
import { Button } from '../ui/Button';

const resourceSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  type: z.enum(['text', 'video', 'audio', 'image']),
  category: z.string().min(1, 'Selecciona una categoría'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  url: z.string().url('Ingresa una URL válida'),
  status: z.enum(['visible', 'hidden'])
});

type ResourceFormData = z.infer<typeof resourceSchema>;

interface Props {
  onSubmit: (data: ResourceFormData) => Promise<void>;
  initialData?: Partial<ResourceFormData>;
}

export function ResourceForm({ onSubmit, initialData }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Título"
        error={errors.title?.message}
        {...register('title')}
      />

      <Select
        label="Tipo de recurso"
        error={errors.type?.message}
        options={[
          { value: 'text', label: 'Texto' },
          { value: 'video', label: 'Video' },
          { value: 'audio', label: 'Audio' },
          { value: 'image', label: 'Imagen' }
        ]}
        {...register('type')}
      />

      <Select
        label="Categoría"
        error={errors.category?.message}
        options={[
          { value: 'meditation', label: 'Meditación' },
          { value: 'therapy', label: 'Terapia' },
          { value: 'support', label: 'Apoyo' }
        ]}
        {...register('category')}
      />

      <TextArea
        label="Descripción"
        error={errors.description?.message}
        {...register('description')}
      />

      <Input
        label="URL del recurso"
        error={errors.url?.message}
        {...register('url')}
      />

      <Select
        label="Estado"
        error={errors.status?.message}
        options={[
          { value: 'visible', label: 'Visible' },
          { value: 'hidden', label: 'Oculto' }
        ]}
        {...register('status')}
      />

      <Button type="submit" isLoading={isSubmitting}>
        {initialData ? 'Actualizar Recurso' : 'Crear Recurso'}
      </Button>
    </form>
  );
}
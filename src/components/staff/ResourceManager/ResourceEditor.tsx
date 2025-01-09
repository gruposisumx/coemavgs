import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RichTextEditor } from './RichTextEditor';
import { FileUploader } from './FileUploader';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';

const resourceSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  type: z.enum(['text', 'video', 'audio', 'document', 'image']),
  category: z.string().min(1, 'Selecciona una categoría'),
  content: z.string().optional(),
  fileUrl: z.string().url().optional(),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  status: z.enum(['draft', 'published'])
});

type ResourceFormData = z.infer<typeof resourceSchema>;

interface Props {
  onSubmit: (data: ResourceFormData) => Promise<void>;
  initialData?: Partial<ResourceFormData>;
}

export function ResourceEditor({ onSubmit, initialData }: Props) {
  const { register, control, handleSubmit, watch, setValue } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: initialData
  });

  const resourceType = watch('type');

  const handleFileUpload = (url: string, type: string) => {
    setValue('fileUrl', url);
    if (type.startsWith('video/')) setValue('type', 'video');
    else if (type.startsWith('audio/')) setValue('type', 'audio');
    else if (type.startsWith('image/')) setValue('type', 'image');
    else setValue('type', 'document');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Título"
        {...register('title')}
      />

      <Select
        label="Tipo de recurso"
        {...register('type')}
        options={[
          { value: 'text', label: 'Texto' },
          { value: 'video', label: 'Video' },
          { value: 'audio', label: 'Audio' },
          { value: 'image', label: 'Imagen' },
          { value: 'document', label: 'Documento' }
        ]}
      />

      <Select
        label="Categoría"
        {...register('category')}
        options={[
          { value: 'self-help', label: 'Autoayuda' },
          { value: 'legal', label: 'Legal' },
          { value: 'health', label: 'Salud' },
          { value: 'education', label: 'Educación' },
          { value: 'support', label: 'Apoyo' }
        ]}
      />

      {resourceType === 'text' ? (
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Contenido
              </label>
              <RichTextEditor
                value={field.value || ''}
                onChange={field.onChange}
              />
            </div>
          )}
        />
      ) : (
        <FileUploader
          onUpload={handleFileUpload}
          accept={
            resourceType === 'video' ? 'video/*' :
            resourceType === 'audio' ? 'audio/*' :
            resourceType === 'image' ? 'image/*' :
            '.pdf,.doc,.docx,.txt'
          }
        />
      )}

      <Input
        label="Descripción"
        {...register('description')}
      />

      <Select
        label="Estado"
        {...register('status')}
        options={[
          { value: 'draft', label: 'Borrador' },
          { value: 'published', label: 'Publicado' }
        ]}
      />

      <Button type="submit">
        {initialData ? 'Actualizar' : 'Crear'} Recurso
      </Button>
    </form>
  );
}
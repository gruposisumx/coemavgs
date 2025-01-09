import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RichTextEditor } from '../../staff/ResourceManager/RichTextEditor';
import { FileUploader } from '../../staff/ResourceManager/FileUploader';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';
import { Tags } from './Tags';

const blogPostSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  content: z.string().min(100, 'El contenido debe tener al menos 100 caracteres'),
  coverImage: z.string().url().optional(),
  excerpt: z.string().max(200, 'El resumen no debe exceder los 200 caracteres'),
  tags: z.array(z.string()).min(1, 'Agrega al menos una etiqueta'),
  category: z.string().min(1, 'Selecciona una categoría'),
  status: z.enum(['draft', 'published'])
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

interface Props {
  onSubmit: (data: BlogPostFormData) => Promise<void>;
  initialData?: Partial<BlogPostFormData>;
}

export function BlogEditor({ onSubmit, initialData }: Props) {
  const { register, control, handleSubmit, setValue } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: initialData
  });

  const handleCoverImageUpload = (url: string) => {
    setValue('coverImage', url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Título"
        {...register('title')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagen de portada
        </label>
        <FileUploader
          onUpload={handleCoverImageUpload}
          accept="image/*"
        />
      </div>

      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Contenido
            </label>
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
            />
          </div>
        )}
      />

      <Input
        label="Resumen"
        {...register('excerpt')}
        maxLength={200}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <Tags
            value={field.value}
            onChange={field.onChange}
            suggestions={[
              'Superación', 'Autoestima', 'Sanación',
              'Empoderamiento', 'Comunidad', 'Apoyo',
              'Experiencias', 'Consejos', 'Recursos'
            ]}
          />
        )}
      />

      <Select
        label="Categoría"
        {...register('category')}
        options={[
          { value: 'stories', label: 'Historias personales' },
          { value: 'advice', label: 'Consejos y guías' },
          { value: 'resources', label: 'Recursos útiles' },
          { value: 'community', label: 'Comunidad' },
          { value: 'events', label: 'Eventos' }
        ]}
      />

      <Select
        label="Estado"
        {...register('status')}
        options={[
          { value: 'draft', label: 'Borrador' },
          { value: 'published', label: 'Publicado' }
        ]}
      />

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary">
          Guardar como borrador
        </Button>
        <Button type="submit">
          Publicar entrada
        </Button>
      </div>
    </form>
  );
}
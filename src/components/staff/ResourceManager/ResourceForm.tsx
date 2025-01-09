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
  title: z.string().min(3),
  type: z.enum(['text', 'video', 'audio', 'image', 'document']),
  content: z.string().optional(),
  fileUrl: z.string().url().optional(),
  category: z.string(),
  status: z.enum(['draft', 'published'])
});

type ResourceFormData = z.infer<typeof resourceSchema>;

interface Props {
  onSubmit: (data: ResourceFormData) => Promise<void>;
  initialData?: Partial<ResourceFormData>;
}

export function ResourceForm({ onSubmit, initialData }: Props) {
  const { register, control, handleSubmit, setValue } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: initialData
  });

  const handleFileUpload = (url: string) => {
    setValue('fileUrl', url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Título"
        {...register('title')}
      />

      <Select
        label="Tipo"
        {...register('type')}
        options={[
          { value: 'text', label: 'Texto' },
          { value: 'video', label: 'Video' },
          { value: 'audio', label: 'Audio' },
          { value: 'image', label: 'Imagen' },
          { value: 'document', label: 'Documento' }
        ]}
      />

      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <RichTextEditor
            value={field.value || ''}
            onChange={field.onChange}
          />
        )}
      />

      <FileUploader
        onUpload={handleFileUpload}
        accept=".pdf,.doc,.docx,.txt,.mp3,.mp4,.jpg,.png"
      />

      <Button type="submit">
        {initialData ? 'Actualizar' : 'Crear'} Recurso
      </Button>
    </form>
  );
}
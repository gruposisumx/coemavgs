import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RichTextEditor } from '../../staff/ResourceManager/RichTextEditor';
import { FileUploader } from '../../staff/ResourceManager/FileUploader';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';
import { Switch } from '../../ui/Switch';

const blockSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  type: z.enum(['hero', 'features', 'testimonials', 'cta', 'stats', 'team', 'contact']),
  content: z.string(),
  enabled: z.boolean(),
  order: z.number().min(0),
  settings: z.object({
    backgroundColor: z.string(),
    textColor: z.string(),
    layout: z.enum(['full', 'contained']),
    columns: z.number().min(1).max(4),
    showImage: z.boolean(),
    imagePosition: z.enum(['left', 'right', 'top', 'bottom']),
    imageUrl: z.string().url .optional()
  })
});

type BlockFormData = z.infer<typeof blockSchema>;

interface Props {
  onSubmit: (data: BlockFormData) => Promise<void>;
  initialData?: Partial<BlockFormData>;
}

export function BlockEditor({ onSubmit, initialData }: Props) {
  const { register, control, handleSubmit, watch, setValue } = useForm<BlockFormData>({
    resolver: zodResolver(blockSchema),
    defaultValues: {
      enabled: true,
      settings: {
        layout: 'contained',
        columns: 1,
        showImage: false,
        imagePosition: 'right'
      },
      ...initialData
    }
  });

  const blockType = watch('type');
  const showImage = watch('settings.showImage');

  const handleImageUpload = (url: string) => {
    setValue('settings.imageUrl', url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Título del bloque"
          {...register('title')}
        />

        <Select
          label="Tipo de bloque"
          {...register('type')}
          options={[
            { value: 'hero', label: 'Hero' },
            { value: 'features', label: 'Características' },
            { value: 'testimonials', label: 'Testimonios' },
            { value: 'cta', label: 'Llamada a la acción' },
            { value: 'stats', label: 'Estadísticas' },
            { value: 'team', label: 'Equipo' },
            { value: 'contact', label: 'Contacto' }
          ]}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Contenido
        </label>
        <RichTextEditor
          value={watch('content') || ''}
          onChange={(content) => setValue('content', content)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Color de fondo"
          type="color"
          {...register('settings.backgroundColor')}
        />

        <Input
          label="Color de texto"
          type="color"
          {...register('settings.textColor')}
        />

        <Select
          label="Disposición"
          {...register('settings.layout')}
          options={[
            { value: 'full', label: 'Ancho completo' },
            { value: 'contained', label: 'Contenido' }
          ]}
        />
      </div>

      {blockType === 'features' && (
        <Input
          label="Número de columnas"
          type="number"
          min={1}
          max={4}
          {...register('settings.columns', { valueAsNumber: true })}
        />
      )}

      <div className="space-y-4">
        <Switch
          label="Mostrar imagen"
          {...register('settings.showImage')}
        />

        {showImage && (
          <>
            <Select
              label="Posición de la imagen"
              {...register('settings.imagePosition')}
              options={[
                { value: 'left', label: 'Izquierda' },
                { value: 'right', label: 'Derecha' },
                { value: 'top', label: 'Arriba' },
                { value: 'bottom', label: 'Abajo' }
              ]}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen
              </label>
              <FileUploader
                onUpload={handleImageUpload}
                accept="image/*"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Switch
          label="Bloque habilitado"
          {...register('enabled')}
        />

        <Input
          type="number"
          label="Orden"
          className="w-24"
          {...register('order', { valueAsNumber: true })}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          {initialData ? 'Actualizar' : 'Crear'} Bloque
        </Button>
      </div>
    </form>
  );
}
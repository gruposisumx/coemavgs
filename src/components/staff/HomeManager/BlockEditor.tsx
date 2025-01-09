import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../ui/Input';
import { TextArea } from '../../ui/TextArea';
import { Button } from '../../ui/Button';
import { Switch } from '../../ui/Switch';

const blockSchema = z.object({
  title: z.string().min(3),
  content: z.string(),
  enabled: z.boolean(),
  order: z.number(),
  type: z.enum(['text', 'image', 'video', 'cta'])
});

type BlockData = z.infer<typeof blockSchema>;

interface Props {
  onSubmit: (data: BlockData) => Promise<void>;
  initialData?: Partial<BlockData>;
}

export function BlockEditor({ onSubmit, initialData }: Props) {
  const { register, handleSubmit } = useForm<BlockData>({
    resolver: zodResolver(blockSchema),
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Título del bloque"
        {...register('title')}
      />

      <TextArea
        label="Contenido"
        {...register('content')}
      />

      <div className="flex items-center space-x-2">
        <Switch
          {...register('enabled')}
        />
        <span>Habilitar bloque</span>
      </div>

      <Input
        label="Orden"
        type="number"
        {...register('order', { valueAsNumber: true })}
      />

      <Button type="submit">
        Guardar Bloque
      </Button>
    </form>
  );
}
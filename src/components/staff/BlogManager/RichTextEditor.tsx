import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../ui/Input';
import { TextArea } from '../../ui/TextArea';
import { Button } from '../../ui/Button';

const blogPostSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  content: z.string().min(50, 'El contenido debe tener al menos 50 caracteres'),
  tags: z.array(z.string()).min(1, 'Agrega al menos una etiqueta'),
  status: z.enum(['draft', 'published'])
});

type BlogPostForm = z.infer<typeof blogPostSchema>;

interface Props {
  onSubmit: (data: BlogPostForm) => Promise<void>;
  initialData?: Partial<BlogPostForm>;
}

export function RichTextEditor({ onSubmit, initialData }: Props) {
  const { register, handleSubmit, watch } = useForm<BlogPostForm>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: initialData
  });

  const [preview, setPreview] = React.useState(false);
  const content = watch('content', '');

  const renderPreview = () => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => document.execCommand('bold')}
          >
            Negrita
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => document.execCommand('italic')}
          >
            Cursiva
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => document.execCommand('insertUnorderedList')}
          >
            Lista
          </Button>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setPreview(!preview)}
        >
          {preview ? 'Editar' : 'Vista previa'}
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Título"
          {...register('title')}
        />

        {preview ? (
          <div className="prose max-w-none bg-white p-6 rounded-lg border">
            {renderPreview()}
          </div>
        ) : (
          <TextArea
            label="Contenido"
            rows={15}
            className="font-mono"
            {...register('content')}
          />
        )}

        <div className="flex gap-4">
          <Button type="submit">Publicar</Button>
          <select
            {...register('status')}
            className="rounded-lg border-gray-300"
          >
            <option value="draft">Borrador</option>
            <option value="published">Publicar</option>
          </select>
        </div>
      </form>
    </div>
  );
}
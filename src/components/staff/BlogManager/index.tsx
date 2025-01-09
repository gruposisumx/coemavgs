import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReactMarkdown from 'react-markdown';
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

export function BlogManager() {
  const [preview, setPreview] = React.useState(false);
  const { register, handleSubmit, watch } = useForm<BlogPostForm>();
  const content = watch('content', '');

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button 
          type="button"
          variant="secondary"
          onClick={() => setPreview(!preview)}
        >
          {preview ? 'Editar' : 'Vista previa'}
        </Button>
      </div>

      {preview ? (
        <div className="prose max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <form className="space-y-6">
          <Input
            label="Título"
            {...register('title')}
          />

          <TextArea
            label="Contenido (Markdown)"
            rows={15}
            {...register('content')}
          />

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
      )}
    </div>
  );
}
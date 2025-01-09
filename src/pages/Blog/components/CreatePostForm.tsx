import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../../hooks/useAuth';
import { supabase } from '../../../lib/supabase';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { RichTextEditor } from '../../../components/staff/ResourceManager/RichTextEditor';

const postSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  content: z.string().min(20, 'El contenido debe tener al menos 20 caracteres'),
  category: z.string().min(1, 'Selecciona una categoría')
});

type PostForm = z.infer<typeof postSchema>;

interface Props {
  onPostCreated: () => void;
}

export function CreatePostForm({ onPostCreated }: Props) {
  const { user } = useAuth();
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<PostForm>({
    resolver: zodResolver(postSchema)
  });

  const onSubmit = async (data: PostForm) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title: data.title,
          content: data.content,
          category: data.category,
          author_id: user.id
        });

      if (error) throw error;
      
      reset();
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <Input
        label="Título"
        error={errors.title?.message}
        {...register('title')}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Contenido
        </label>
        <RichTextEditor
          value=""
          onChange={(content) => setValue('content', content)}
        />
        {errors.content && (
          <p className="text-red-600 text-sm">{errors.content.message}</p>
        )}
      </div>

      <select
        {...register('category')}
        className="w-full rounded-lg border-gray-300"
      >
        <option value="">Selecciona una categoría</option>
        <option value="testimonios">Testimonios</option>
        <option value="superacion">Superación</option>
        <option value="apoyo">Apoyo</option>
        <option value="recursos">Recursos</option>
      </select>
      {errors.category && (
        <p className="text-red-600 text-sm">{errors.category.message}</p>
      )}

      <Button type="submit" isLoading={isSubmitting}>
        Publicar
      </Button>
    </form>
  );
}
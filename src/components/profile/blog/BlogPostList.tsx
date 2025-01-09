import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useSupabaseQuery } from '../../../hooks/useSupabaseQuery';
import { Button } from '../../ui/Button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  likes_count: number;
}

export function BlogPostList() {
  const { data: posts, loading, refetch } = useSupabaseQuery<BlogPost>('blog_posts');

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás segura de que deseas eliminar esta publicación?')) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      refetch();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return <div className="animate-pulse">Cargando publicaciones...</div>;
  }

  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {format(new Date(post.created_at), "d 'de' MMMM, yyyy", { locale: es })}
              </p>
              <p className="mt-2 text-gray-600 line-clamp-2">{post.content}</p>
              <p className="text-sm text-purple-600 mt-2">
                ❤️ {post.likes_count} me gusta
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="danger" 
                size="sm"
                onClick={() => handleDelete(post.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
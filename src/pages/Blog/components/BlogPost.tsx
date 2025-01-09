import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { supabase } from '../../../lib/supabase';
import type { Database } from '../../../types/supabase';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface Props {
  post: BlogPost;
}

export function BlogPost({ post }: Props) {
  const { user } = useAuth();
  const [likesCount, setLikesCount] = React.useState(post.likes_count);
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLike = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ likes_count: likesCount + 1 })
        .eq('id', post.id);

      if (error) throw error;
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-purple-900 mb-4">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.content}</p>
      
      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          disabled={!user || isLiked}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 disabled:opacity-50"
        >
          <Heart className="w-5 h-5" />
          <span>{likesCount}</span>
        </button>
        
        <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
          <MessageCircle className="w-5 h-5" />
          <span>Comentar</span>
        </button>
      </div>
    </article>
  );
}
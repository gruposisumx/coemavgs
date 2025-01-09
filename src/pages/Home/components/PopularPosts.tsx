import React from 'react';
import { useSupabaseQuery } from '../../../hooks/useSupabaseQuery';
import type { Database } from '../../../types/supabase';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export function PopularPosts() {
  const { data: posts } = useSupabaseQuery<BlogPost>('blog_posts', {
    orderBy: { column: 'likes_count', ascending: false },
    limit: 3
  });

  if (!posts?.length) return null;

  return (
    <section className="py-16 bg-purple-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
          Publicaciones Populares
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.content}
              </p>
              <div className="text-purple-600">
                ❤️ {post.likes_count} me gusta
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
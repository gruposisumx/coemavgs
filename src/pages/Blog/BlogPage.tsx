import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { BlogPost } from './components/BlogPost';
import { CreatePostForm } from './components/CreatePostForm';
import { BlogCategories } from './components/BlogCategories';
import { BlogSearch } from './components/BlogSearch';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export function BlogPage() {
  const { user } = useAuth();
  const [category, setCategory] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { data: posts, loading, refetch } = useSupabaseQuery('blog_posts', {
    select: `
      *,
      author:profiles(display_name, avatar_url),
      comments:blog_comments(count),
      likes:blog_likes(count)
    `,
    filter: {
      ...(category && { category }),
      ...(searchTerm && { 
        title: { ilike: `%${searchTerm}%` },
        content: { ilike: `%${searchTerm}%` }
      })
    },
    orderBy: { column: 'created_at', ascending: false }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-900 mb-8">Blog Comunitario</h1>
        
        <div className="mb-8 space-y-4">
          <BlogSearch onSearch={setSearchTerm} />
          <BlogCategories 
            selectedCategory={category} 
            onSelectCategory={setCategory} 
          />
        </div>

        {user && (
          <div className="mb-8">
            <CreatePostForm onPostCreated={refetch} />
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-8">
            {posts?.map((post) => (
              <BlogPost 
                key={post.id} 
                post={post}
                onUpdate={refetch}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
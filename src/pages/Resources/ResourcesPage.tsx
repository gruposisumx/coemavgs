import React from 'react';
import { FileText, Headphones, Image } from 'lucide-react';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'audio' | 'image' | 'video';
  url: string;
}

export function ResourcesPage() {
  const { data: resources, loading } = useSupabaseQuery<Resource>('resources');

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-8 h-8" />;
      case 'audio':
        return <Headphones className="w-8 h-8" />;
      case 'image':
        return <Image className="w-8 h-8" />;
      default:
        return <FileText className="w-8 h-8" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-900 mb-8">Recursos</h1>

      {loading ? (
        <p>Cargando recursos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources?.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="text-purple-600">
                  {getIcon(resource.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600">{resource.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
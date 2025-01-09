import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery';
import { supabase } from '../../lib/supabase';
import { ResourceForm } from '../../components/staff/ResourceForm';
import { Button } from '../../components/ui/Button';
import { useStaffAuth } from '../../hooks/useStaffAuth';

interface Resource {
  id: string;
  title: string;
  type: 'text' | 'video' | 'audio' | 'image';
  category: string;
  description: string;
  url: string;
  status: 'visible' | 'hidden';
}

export function ResourcesManagement() {
  const { isAuthenticated } = useStaffAuth();
  const [isCreating, setIsCreating] = React.useState(false);
  const [editingResource, setEditingResource] = React.useState<Resource | null>(null);
  const { data: resources, refetch } = useSupabaseQuery<Resource>('resources');

  if (!isAuthenticated) return null;

  const handleCreate = async (data: Omit<Resource, 'id'>) => {
    try {
      const { error } = await supabase.from('resources').insert(data);
      if (error) throw error;
      setIsCreating(false);
      refetch();
    } catch (error) {
      console.error('Error creating resource:', error);
    }
  };

  const handleUpdate = async (data: Partial<Resource>) => {
    if (!editingResource) return;
    try {
      const { error } = await supabase
        .from('resources')
        .update(data)
        .eq('id', editingResource.id);
      if (error) throw error;
      setEditingResource(null);
      refetch();
    } catch (error) {
      console.error('Error updating resource:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este recurso?')) return;
    try {
      const { error } = await supabase.from('resources').delete().eq('id', id);
      if (error) throw error;
      refetch();
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-purple-900">Gestión de Recursos</h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Recurso
        </Button>
      </div>

      {isCreating && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Crear Nuevo Recurso</h2>
          <ResourceForm onSubmit={handleCreate} />
        </div>
      )}

      {editingResource && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Editar Recurso</h2>
          <ResourceForm 
            onSubmit={handleUpdate}
            initialData={editingResource}
          />
        </div>
      )}

      <div className="grid gap-6">
        {resources?.map((resource) => (
          <div 
            key={resource.id}
            className="bg-white p-6 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-purple-900">{resource.title}</h3>
              <p className="text-gray-600">{resource.description}</p>
              <div className="mt-2 space-x-2">
                <span className="inline-block px-2 py-1 text-sm bg-purple-100 text-purple-800 rounded">
                  {resource.type}
                </span>
                <span className="inline-block px-2 py-1 text-sm bg-purple-100 text-purple-800 rounded">
                  {resource.category}
                </span>
                <span className={`inline-block px-2 py-1 text-sm rounded ${
                  resource.status === 'visible' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {resource.status}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="secondary"
                onClick={() => setEditingResource(resource)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="danger"
                onClick={() => handleDelete(resource.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
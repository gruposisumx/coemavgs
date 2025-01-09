import React from 'react';
import { useStaffAuth } from '../../hooks/useStaffAuth';
import { ResourceForm } from '../../components/staff/ResourceManager/ResourceForm';
import { EventForm } from '../../components/staff/EventManager/EventForm';
import { PsychologistManager } from '../../components/staff/PsychologistManager';
import { BlogManager } from '../../components/staff/BlogManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';

export function StaffDashboard() {
  const { isAuthenticated, logout } = useStaffAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-purple-900">Panel de Administración</h1>
        <button 
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>

      <Tabs defaultValue="resources">
        <TabsList>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="psychologists">Psicólogos</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
        </TabsList>

        <TabsContent value="resources">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Gestión de Recursos</h2>
            <ResourceForm onSubmit={async (data) => {
              console.log(data);
              // Implementar lógica de guardado
            }} />
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Gestión de Eventos</h2>
            <EventForm onSubmit={async (data) => {
              console.log(data);
              // Implementar lógica de guardado
            }} />
          </div>
        </TabsContent>

        <TabsContent value="psychologists">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Gestión de Psicólogos</h2>
            <PsychologistManager />
          </div>
        </TabsContent>

        <TabsContent value="blog">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Gestión del Blog</h2>
            <BlogManager />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
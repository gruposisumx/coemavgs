import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileInfo } from '../../components/profile/ProfileInfo';
import { ProfileEditModal } from '../../components/profile/ProfileEditModal';
import { AppointmentList } from '../../components/profile/appointments/AppointmentList';
import { BlogPostList } from '../../components/profile/blog/BlogPostList';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';

export function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatarUrl: user?.user_metadata?.avatar_url,
    coverUrl: user?.user_metadata?.cover_url,
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleUpdateProfile = async (data: any) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: data.name,
          phone: data.phone,
        }
      });

      if (error) throw error;

      setProfile(prev => ({
        ...prev,
        ...data
      }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleUpdateImage = async (type: 'avatar' | 'cover', file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${type}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(fileName);

      await supabase.auth.updateUser({
        data: {
          [`${type}_url`]: publicUrl
        }
      });

      setProfile(prev => ({
        ...prev,
        [`${type}Url`]: publicUrl
      }));
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };

  const handleFileSelect = (type: 'avatar' | 'cover') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleUpdateImage(type, file);
      }
    };
    input.click();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <ProfileHeader
          coverUrl={profile.coverUrl}
          avatarUrl={profile.avatarUrl}
          onEditCover={() => handleFileSelect('cover')}
          onEditAvatar={() => handleFileSelect('avatar')}
        />
        
        <div className="mt-16">
          <ProfileInfo
            name={profile.name}
            email={profile.email}
            phone={profile.phone}
            onEdit={() => setIsEditing(true)}
          />
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="appointments">
          <TabsList>
            <TabsTrigger value="appointments">Mis Citas</TabsTrigger>
            <TabsTrigger value="posts">Mis Publicaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="mt-6">
            <AppointmentList />
          </TabsContent>

          <TabsContent value="posts" className="mt-6">
            <BlogPostList />
          </TabsContent>
        </Tabs>
      </div>

      <ProfileEditModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleUpdateProfile}
        initialData={profile}
      />
    </div>
  );
}
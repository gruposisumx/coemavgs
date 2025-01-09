import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../ui/Button';
import { Loader2 } from 'lucide-react';

interface Props {
  onUpload: (url: string) => void;
}

export function ImageUploader({ onUpload }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(data.path);

      onUpload(publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Imagen de perfil
      </label>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Subiendo...
            </>
          ) : (
            'Subir imagen'
          )}
        </Button>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
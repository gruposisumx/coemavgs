import React, { useCallback } from 'react';
import { supabase } from '../../../lib/supabase';

interface Props {
  onUpload: (url: string) => void;
  accept: string;
}

export function FileUploader({ onUpload, accept }: Props) {
  const handleUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('resources')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('resources')
        .getPublicUrl(data.path);

      onUpload(publicUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error al subir el archivo');
    }
  }, [onUpload]);

  return (
    <input
      type="file"
      onChange={handleUpload}
      accept={accept}
      className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-purple-50 file:text-purple-700
        hover:file:bg-purple-100"
    />
  );
}
import React from 'react';
import { Camera, Edit } from 'lucide-react';
import { Button } from '../ui/Button';

interface Props {
  coverUrl?: string;
  avatarUrl?: string;
  onEditCover: () => void;
  onEditAvatar: () => void;
}

export function ProfileHeader({ coverUrl, avatarUrl, onEditCover, onEditAvatar }: Props) {
  return (
    <div className="relative">
      <div 
        className="h-48 bg-gradient-to-r from-primary-100 to-secondary-100 relative"
        style={coverUrl ? { backgroundImage: `url(${coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        <Button
          variant="secondary"
          className="absolute bottom-4 right-4"
          onClick={onEditCover}
        >
          <Camera className="w-4 h-4 mr-2" />
          Cambiar portada
        </Button>
      </div>
      
      <div className="absolute -bottom-16 left-8">
        <div className="relative">
          <img
            src={avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3'}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
          <button
            onClick={onEditAvatar}
            className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Button } from '../ui/Button';

interface Props {
  name: string;
  email: string;
  phone?: string;
  onEdit: () => void;
}

export function ProfileInfo({ name, email, phone, onEdit }: Props) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              {email}
            </div>
            {phone && (
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {phone}
              </div>
            )}
          </div>
        </div>
        <Button onClick={onEdit}>
          Editar perfil
        </Button>
      </div>
    </div>
  );
}
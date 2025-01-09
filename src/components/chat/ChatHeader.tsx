import React from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function ChatHeader({ onClose }: Props) {
  return (
    <div className="bg-primary-600 text-white p-4 rounded-t-lg flex justify-between items-center">
      <h3 className="font-semibold">Asistente Emocional 24/7</h3>
      <button
        onClick={onClose}
        className="text-white hover:text-primary-100"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
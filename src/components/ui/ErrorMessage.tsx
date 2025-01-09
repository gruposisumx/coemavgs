import { AlertTriangle } from 'lucide-react';

interface Props {
  message: string;
}

export function ErrorMessage({ message }: Props) {
  return (
    <div className="flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg">
      <AlertTriangle className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
}
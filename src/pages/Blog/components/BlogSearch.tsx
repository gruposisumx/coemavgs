import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../../components/ui/Input';

interface Props {
  onSearch: (term: string) => void;
}

export function BlogSearch({ onSearch }: Props) {
  const [value, setValue] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar publicaciones..."
        className="pl-10"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    </form>
  );
}
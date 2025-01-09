import React from 'react';

const CATEGORIES = [
  { id: 'testimonios', label: 'Testimonios' },
  { id: 'superacion', label: 'Superación' },
  { id: 'apoyo', label: 'Apoyo' },
  { id: 'recursos', label: 'Recursos' }
];

interface Props {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function BlogCategories({ selectedCategory, onSelectCategory }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !selectedCategory 
            ? 'bg-purple-600 text-white' 
            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
        }`}
      >
        Todos
      </button>
      
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category.id
              ? 'bg-purple-600 text-white'
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
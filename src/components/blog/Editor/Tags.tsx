import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
}

export function Tags({ value = [], onChange, suggestions = [] }: Props) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input) {
      e.preventDefault();
      if (!value.includes(input)) {
        onChange([...value, input]);
      }
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const addTag = (tag: string) => {
    if (!value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput('');
    setShowSuggestions(false);
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => suggestion.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Etiquetas
      </label>
      <div className="relative">
        <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-white">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-purple-600 hover:text-purple-800"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            className="flex-1 min-w-[120px] outline-none"
            placeholder="Agregar etiqueta..."
          />
        </div>
        
        {showSuggestions && input && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addTag(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-purple-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
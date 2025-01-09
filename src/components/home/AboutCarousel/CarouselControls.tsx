import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export function CarouselControls({ 
  currentSlide, 
  totalSlides, 
  onPrevious, 
  onNext, 
  onDotClick 
}: Props) {
  return (
    <div className="absolute bottom-8 left-0 right-0">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <button
          onClick={onPrevious}
          className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index
                  ? 'bg-primary-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>
    </div>
  );
}
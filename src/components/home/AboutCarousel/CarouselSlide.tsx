import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  icon: Icon;
  imageUrl: string;
  isActive: boolean;
}

export function CarouselSlide({ title, description, icon: IconComponent, imageUrl, isActive }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex items-center"
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100">
            <IconComponent className="w-8 h-8 text-primary-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-lg text-gray-600">{description}</p>
        </div>

        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}
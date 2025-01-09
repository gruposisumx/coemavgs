import { motion } from 'framer-motion';

interface Props {
  title: string;
  description: string;
  signs: string[];
  imageUrl: string;
}

export function ViolenceTypeCard({ title, description, signs, imageUrl }: Props) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-purple-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div>
          <h4 className="font-semibold text-purple-700 mb-2">Señales de alerta:</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {signs.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
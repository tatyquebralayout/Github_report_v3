import React from 'react';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

export function CoffeeAnimation() {
  return (
    <div className="relative">
      <Coffee className="w-5 h-5" />
      
      {/* Animação de vapor/fumaça */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ 
          opacity: [0, 0.7, 0],
          y: [-5, -10, -15]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 2,
          repeatDelay: 1
        }}
        className="absolute -top-1 left-0 w-3 h-3 bg-white rounded-full blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ 
          opacity: [0, 0.5, 0],
          y: [-5, -8, -12]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 1.5,
          delay: 0.5,
          repeatDelay: 1
        }}
        className="absolute -top-1 left-1 w-2 h-2 bg-white rounded-full blur-sm"
      />
    </div>
  );
}
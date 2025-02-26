import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap } from 'lucide-react';

interface ContributorCardProps {
  name: string;
  contributions: number;
}

export function ContributorCard({ name, contributions }: ContributorCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={`https://github.com/${name}.png`}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
            }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"
          />
        </div>
        <div className="flex-1">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-semibold text-gray-900 text-lg"
          >
            {name}
          </motion.h3>
          <div className="flex items-center space-x-2 text-gray-600">
            <Zap className="w-4 h-4" />
            <span className="text-sm">{contributions} contributions</span>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        style={{ width: `${Math.min(100, (contributions / 1500) * 100)}%` }}
      />
    </motion.div>
  );
}
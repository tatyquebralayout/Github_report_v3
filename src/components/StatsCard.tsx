import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  color: string;
  percentage?: number;
}

export function StatsCard({ icon: Icon, title, value, color, percentage }: StatsCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${color.replace('border-', 'bg-').replace('-500', '-100')}`}>
          <Icon className={`w-6 h-6 ${color.replace('border-', 'text-')}`} />
        </div>
        <div className="text-right">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-800"
          >
            {value.toLocaleString()}
          </motion.span>
          {percentage !== undefined && (
            <div className="flex items-center justify-end mt-1">
              {percentage > 0 ? (
                <span className="text-green-500 text-sm flex items-center">
                  <ChevronUp className="w-4 h-4" />
                  {percentage}%
                </span>
              ) : (
                <span className="text-red-500 text-sm flex items-center">
                  <ChevronDown className="w-4 h-4" />
                  {Math.abs(percentage)}%
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <h3 className="mt-4 text-gray-600 font-medium">{title}</h3>
    </motion.div>
  );
}
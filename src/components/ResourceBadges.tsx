import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Book, Award } from 'lucide-react';

interface ResourceBadgesProps {
  resources: {
    hasReadme: boolean;
    hasCodeOfConduct: boolean;
    hasSecurityPolicy: boolean;
    hasCitation: boolean;
  };
}

export function ResourceBadges({ resources }: ResourceBadgesProps) {
  const badges = [
    {
      name: 'README',
      available: resources.hasReadme,
      icon: FileText,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Code of Conduct',
      available: resources.hasCodeOfConduct,
      icon: Book,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      name: 'Security Policy',
      available: resources.hasSecurityPolicy,
      icon: Shield,
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Citation',
      available: resources.hasCitation,
      icon: Award,
      color: 'bg-amber-100 text-amber-800'
    }
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            badge.available ? badge.color : 'bg-gray-100 text-gray-500'
          }`}
        >
          <badge.icon className="w-3 h-3 mr-1" />
          {badge.name}
        </motion.div>
      ))}
    </div>
  );
}
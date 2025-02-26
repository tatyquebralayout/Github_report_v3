import React from 'react';
import { Hash } from 'lucide-react';

interface TopicTagProps {
  topic: string;
  variant?: 'default' | 'header';
}

export function TopicTag({ topic, variant = 'default' }: TopicTagProps) {
  if (variant === 'header') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white mr-2 mb-2 backdrop-blur-sm">
        <Hash className="w-3 h-3 mr-1" />
        {topic}
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
      <Hash className="w-3 h-3 mr-1" />
      {topic}
    </span>
  );
}
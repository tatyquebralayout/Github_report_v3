import React from 'react';
import { Languages } from '../types';

interface LanguageChartProps {
  languages?: Languages;
}

export function LanguageChart({ languages }: LanguageChartProps) {
  if (!languages) return null;
  
  const colorMap: Record<string, string> = {
    JavaScript: 'bg-yellow-500',
    TypeScript: 'bg-blue-500',
    Python: 'bg-green-500',
    Java: 'bg-red-500',
    'C++': 'bg-purple-500',
    C: 'bg-indigo-500',
    Dart: 'bg-cyan-500',
    CSS: 'bg-pink-500',
    HTML: 'bg-orange-500',
    Other: 'bg-gray-500'
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Languages</h3>
      <div className="flex h-4 rounded-full overflow-hidden">
        {Object.entries(languages).map(([lang, percentage]) => {
          const color = colorMap[lang] || 'bg-gray-500';
          return (
            <div 
              key={lang} 
              className={`${color} h-full`} 
              style={{ width: `${percentage}%` }}
              title={`${lang}: ${percentage}%`}
            />
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {Object.entries(languages).map(([lang, percentage]) => {
          const color = colorMap[lang] || 'bg-gray-500';
          return (
            <div key={lang} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${color} mr-2`} />
              <span className="text-sm text-gray-700">{lang} ({percentage}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
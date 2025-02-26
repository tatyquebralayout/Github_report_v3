import React from 'react';
import { Contributors } from '../types';

interface ContributionDistributionProps {
  contributors: Contributors;
}

export function ContributionDistribution({ contributors }: ContributionDistributionProps) {
  const total = 
    contributors.core_developers + 
    contributors.active_volunteers + 
    contributors.occasional_volunteers + 
    contributors.one_time_contributors;
  
  const getPercentage = (value: number) => (value / total) * 100;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Contribution Distribution</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">Core Developers</span>
            <span className="text-sm text-gray-600">{contributors.core_developers}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${getPercentage(contributors.core_developers)}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">Active Volunteers</span>
            <span className="text-sm text-gray-600">{contributors.active_volunteers}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full" 
              style={{ width: `${getPercentage(contributors.active_volunteers)}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">Occasional Volunteers</span>
            <span className="text-sm text-gray-600">{contributors.occasional_volunteers}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full" 
              style={{ width: `${getPercentage(contributors.occasional_volunteers)}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">One-time Contributors</span>
            <span className="text-sm text-gray-600">{contributors.one_time_contributors}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${getPercentage(contributors.one_time_contributors)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
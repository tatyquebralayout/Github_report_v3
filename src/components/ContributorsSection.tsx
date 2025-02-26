import React from 'react';
import { Code, Heart } from 'lucide-react';
import { Contributors } from '../types';
import { ContributorCard } from './ContributorCard';

interface ContributorsSectionProps {
  contributors: Contributors;
}

export function ContributorsSection({ contributors }: ContributorsSectionProps) {
  return (
    <div className="space-y-8">
      {contributors.core_dev_details.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center space-x-2">
            <Code className="w-6 h-6 text-blue-600" />
            <span>Core Developers</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contributors.core_dev_details.map(([name, contributions]) => (
              <ContributorCard key={name} name={name} contributions={contributions} />
            ))}
          </div>
        </div>
      )}

      {contributors.active_volunteer_details.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center space-x-2">
            <Heart className="w-6 h-6 text-red-600" />
            <span>Active Volunteers</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contributors.active_volunteer_details.map(([name, contributions]) => (
              <ContributorCard key={name} name={name} contributions={contributions} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
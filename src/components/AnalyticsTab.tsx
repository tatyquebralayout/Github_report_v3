import React from 'react';
import { RepoData } from '../types';
import { LanguageChart } from './LanguageChart';
import { ActivityChart } from './ActivityChart';
import { ContributionDistribution } from './ContributionDistribution';

interface AnalyticsTabProps {
  repo: RepoData;
}

export function AnalyticsTab({ repo }: AnalyticsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <LanguageChart languages={repo.languages} />
      <ActivityChart activity={repo.activity} />
      <ContributionDistribution contributors={repo.contributors} />
    </div>
  );
}
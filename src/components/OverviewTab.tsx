import React from 'react';
import { Users, Heart, GitPullRequest, MessageSquare, GitFork, Eye } from 'lucide-react';
import { RepoData } from '../types';
import { StatsCard } from './StatsCard';
import { RecentActivity } from './RecentActivity';

interface OverviewTabProps {
  repo: RepoData;
}

export function OverviewTab({ repo }: OverviewTabProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          icon={Users}
          title="Core Developers"
          value={repo.contributors.core_developers}
          color="border-blue-500"
          percentage={8}
        />
        <StatsCard
          icon={Heart}
          title="Active Volunteers"
          value={repo.contributors.active_volunteers}
          color="border-red-500"
          percentage={12}
        />
        <StatsCard
          icon={GitPullRequest}
          title="Coding Events"
          value={repo.events.coding_events_total}
          color="border-green-500"
          percentage={5}
        />
        <StatsCard
          icon={MessageSquare}
          title="Social Events"
          value={repo.events.social_events_total}
          color="border-purple-500"
          percentage={-3}
        />
        <StatsCard
          icon={GitFork}
          title="Occasional Contributors"
          value={repo.contributors.occasional_volunteers}
          color="border-orange-500"
          percentage={2}
        />
        <StatsCard
          icon={Eye}
          title="One-time Contributors"
          value={repo.contributors.one_time_contributors}
          color="border-teal-500"
          percentage={15}
        />
      </div>

      <RecentActivity events={repo.events} />
    </>
  );
}
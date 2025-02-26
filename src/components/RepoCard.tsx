import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Activity, Users, BarChart3, Award } from 'lucide-react';
import { RepoData } from '../types';
import { RepoHeader } from './RepoHeader';
import { OverviewTab } from './OverviewTab';
import { ContributorsSection } from './ContributorsSection';
import { AnalyticsTab } from './AnalyticsTab';
import { CitationDisplay } from './CitationDisplay';
import { ResourceBadges } from './ResourceBadges';

interface RepoCardProps {
  repo: RepoData;
}

export function RepoCard({ repo }: RepoCardProps) {
  const [activeTab, setActiveTab] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Add default resources if not provided
  const resources = repo.resources || {
    hasReadme: true,
    hasCodeOfConduct: false,
    hasSecurityPolicy: false,
    hasCitation: Boolean(repo.citation)
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
    >
      <RepoHeader repo={repo} />

      <div className="px-6 pt-4">
        <ResourceBadges resources={resources} />
      </div>

      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)} className="p-6">
        <TabList className="flex space-x-6 border-b border-gray-200 dark:border-gray-700 mb-8">
          <Tab className="pb-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer focus:outline-none">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span className="font-medium">Overview</span>
            </div>
          </Tab>
          <Tab className="pb-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer focus:outline-none">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="font-medium">Contributors</span>
            </div>
          </Tab>
          <Tab className="pb-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer focus:outline-none">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Analytics</span>
            </div>
          </Tab>
          {repo.citation && (
            <Tab className="pb-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer focus:outline-none">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span className="font-medium">Citation</span>
              </div>
            </Tab>
          )}
        </TabList>

        <TabPanel>
          <OverviewTab repo={repo} />
        </TabPanel>

        <TabPanel>
          <ContributorsSection contributors={repo.contributors} />
        </TabPanel>

        <TabPanel>
          <AnalyticsTab repo={repo} />
        </TabPanel>

        {repo.citation && (
          <TabPanel>
            <CitationDisplay citation={repo.citation} />
          </TabPanel>
        )}
      </Tabs>
    </motion.div>
  );
}
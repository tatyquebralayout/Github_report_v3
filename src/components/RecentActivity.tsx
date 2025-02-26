import React from 'react';
import { Code, GitPullRequest, MessageSquare } from 'lucide-react';
import { Events } from '../types';

interface RecentActivityProps {
  events: Events;
}

export function RecentActivity({ events }: RecentActivityProps) {
  if (!events.PushEvent && !events.PullRequestEvent && !events.IssueCommentEvent) {
    return null;
  }
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.PushEvent && (
          <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600">Pushes</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">{events.PushEvent.toLocaleString()}</span>
            </div>
          </div>
        )}
        {events.PullRequestEvent && (
          <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GitPullRequest className="w-5 h-5 text-purple-500" />
                <span className="text-gray-600">Pull Requests</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">{events.PullRequestEvent.toLocaleString()}</span>
            </div>
          </div>
        )}
        {events.IssueCommentEvent && (
          <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">Comments</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">{events.IssueCommentEvent.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
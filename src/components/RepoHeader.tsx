import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star } from 'lucide-react';
import { RepoData } from '../types';
import { TopicTag } from './TopicTag';

interface RepoHeaderProps {
  repo: RepoData;
}

export function RepoHeader({ repo }: RepoHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Github className="w-10 h-10 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">{repo.name.split('/')[1]}</h2>
              <p className="text-gray-300">{repo.name.split('/')[0]}</p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold text-white">{repo.stars.toLocaleString()}</span>
          </motion.div>
        </div>
        
        {repo.description && (
          <p className="text-gray-300 mb-4">{repo.description}</p>
        )}
        
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap mt-2">
            {repo.topics.map(topic => (
              <TopicTag key={topic} topic={topic} variant="header" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
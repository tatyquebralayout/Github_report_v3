import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';
import { CitationData } from '../types';

interface CitationDisplayProps {
  citation: CitationData;
}

export function CitationDisplay({ citation }: CitationDisplayProps) {
  if (!citation) return null;

  const formatCitation = () => {
    if (citation.preferred_citation) {
      const { authors, title, journal, year, doi } = citation.preferred_citation;
      
      const authorText = authors.join(', ');
      let formattedCitation = `${authorText}. (${year}). ${title}.`;
      
      if (journal) {
        formattedCitation += ` ${journal}.`;
      }
      
      if (doi) {
        formattedCitation += ` DOI: ${doi}`;
      }
      
      return formattedCitation;
    }
    
    // Fallback if no preferred citation
    const authorText = citation.authors 
      ? citation.authors.map(author => author.name).join(', ')
      : 'Unknown Author';
    
    return `${authorText}. ${citation.title || 'Untitled'}.${
      citation.version ? ` Version ${citation.version}.` : ''
    }${citation.date_released ? ` Released: ${citation.date_released}.` : ''}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-lg mt-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Citation Information</h3>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="text-gray-700 text-sm">{formatCitation()}</p>
      </div>
      
      {citation.doi && (
        <div className="mt-4">
          <a 
            href={`https://doi.org/${citation.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            View DOI: {citation.doi}
          </a>
        </div>
      )}
    </motion.div>
  );
}
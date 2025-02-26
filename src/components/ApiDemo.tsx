import React, { useState } from 'react';
import { data } from '../data';
import { RepoData } from '../types';

interface ApiDemoProps {
  onClose: () => void;
}

export function ApiDemo({ onClose }: ApiDemoProps) {
  const [repoName, setRepoName] = useState('');
  const [results, setResults] = useState<RepoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!repoName.trim()) {
      setError('Por favor, digite um nome de repositório');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call with mock data
      setTimeout(() => {
        const filteredRepos = data.filter(repo => 
          repo.name.toLowerCase().includes(repoName.toLowerCase()) || 
          (repo.description && repo.description.toLowerCase().includes(repoName.toLowerCase()))
        );
        
        setResults(filteredRepos);
        
        if (filteredRepos.length === 0) {
          setError('Nenhum repositório encontrado com esse nome');
        }
        
        setIsLoading(false);
      }, 800); // Simulate network delay
    } catch (err) {
      setError('Erro ao buscar repositórios.');
      setIsLoading(false);
    }
  };

  const handleTrending = async () => {
    setIsLoading(true);
    setError('');
    setRepoName('');

    try {
      // Simulate API call with mock data
      setTimeout(() => {
        // Sort by stars to simulate trending
        const trendingRepos = [...data].sort((a, b) => b.stars - a.stars);
        setResults(trendingRepos);
        setIsLoading(false);
      }, 800); // Simulate network delay
    } catch (err) {
      setError('Erro ao buscar repositórios em destaque.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Demonstração com Dados Simulados
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700 dark:text-blue-200">
                Estamos usando dados simulados para evitar problemas com a API do GitHub.
                Esta demonstração usa dados locais pré-definidos.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="Digite o nome do repositório (ex: facebook/react)"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Buscar
            </button>
          </div>
          
          <button
            onClick={handleTrending}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Ver Repositórios em Destaque
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Resultados:</h3>
            {results.map((repo) => (
              <div key={repo.name} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">{repo.name}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{repo.description || 'Sem descrição'}</p>
                <div className="flex items-center mt-2">
                  <span className="flex items-center text-yellow-600 dark:text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    {repo.stars.toLocaleString()}
                  </span>
                  
                  {repo.languages && (
                    <div className="ml-4 flex flex-wrap">
                      {Object.entries(repo.languages).slice(0, 3).map(([lang, _]) => (
                        <span key={lang} className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-2 py-1 rounded mr-2">
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
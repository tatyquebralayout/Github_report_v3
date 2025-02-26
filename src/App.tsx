import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { data } from './data';
import { RepoCard } from './components/RepoCard';
import { SearchBar } from './components/SearchBar';
import { Pagination } from './components/Pagination';
import { ThemeToggle } from './components/ThemeToggle';
import { TokenInput } from './components/TokenInput';
import { ApiDemo } from './components/ApiDemo';
import { CreatorBanner } from './components/CreatorBanner';
import { RepoData, SearchFilters, PaginationState } from './types';
import { searchRepos, getTrendingRepos, setGitHubToken } from './services/githubService';

function App() {
  const [filteredRepos, setFilteredRepos] = useState<RepoData[]>(data);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: Math.ceil(data.length / 2),
    itemsPerPage: 2
  });
  const [displayedRepos, setDisplayedRepos] = useState<RepoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [useRealData, setUseRealData] = useState(false);
  const [searchMode, setSearchMode] = useState<'search' | 'trending'>('search');
  const [lastSearchFilters, setLastSearchFilters] = useState<SearchFilters>({query: ''});
  const [showApiDemo, setShowApiDemo] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showTokenInput, setShowTokenInput] = useState(false);
  
  // Check for token in localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('github_token');
    if (token) {
      setGitHubToken(token);
      setHasToken(true);
      // Default to mock data to avoid API errors
      setUseRealData(false);
    }
  }, []);
  
  // Apply pagination to filtered repos
  useEffect(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    setDisplayedRepos(filteredRepos.slice(startIndex, endIndex));
    
    // Update total pages
    setPagination(prev => ({
      ...prev,
      totalPages: Math.max(1, Math.ceil(filteredRepos.length / pagination.itemsPerPage))
    }));
  }, [filteredRepos, pagination.currentPage, pagination.itemsPerPage]);
  
  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true);
    setApiError(null);
    setLastSearchFilters(filters);
    
    if (useRealData) {
      try {
        const result = await searchRepos(filters, pagination.currentPage, pagination.itemsPerPage);
        setFilteredRepos(result.repos);
        setPagination(result.pagination);
      } catch (error) {
        console.error('Search failed:', error);
        setApiError('Falha ao buscar dados da API do GitHub. Usando dados simulados.');
        // Fallback to mock data
        filterMockData(filters);
      } finally {
        setIsLoading(false);
      }
    } else {
      filterMockData(filters);
      setIsLoading(false);
    }
  };
  
  const filterMockData = (filters: SearchFilters) => {
    let results = [...data];
    
    if (filters.query) {
      const query = filters.query.toLowerCase();
      results = results.filter(repo => 
        repo.name.toLowerCase().includes(query) || 
        (repo.description && repo.description.toLowerCase().includes(query))
      );
    }
    
    if (filters.language) {
      results = results.filter(repo => 
        repo.languages && repo.languages[filters.language!] !== undefined
      );
    }
    
    if (filters.stars) {
      const minStars = parseInt(filters.stars.replace(/[^0-9]/g, ''));
      results = results.filter(repo => repo.stars > minStars);
    }
    
    if (filters.topic) {
      const topic = filters.topic.toLowerCase();
      results = results.filter(repo => 
        repo.topics && repo.topics.some(t => t.toLowerCase().includes(topic))
      );
    }
    
    setFilteredRepos(results);
    // Reset to first page when search changes
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };
  
  const handlePageChange = async (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    
    // If using real data, fetch new page
    if (useRealData) {
      setIsLoading(true);
      setApiError(null);
      try {
        if (searchMode === 'trending') {
          const result = await getTrendingRepos('weekly', page, pagination.itemsPerPage);
          setFilteredRepos(result.repos);
          setPagination(prev => ({ ...prev, totalPages: result.pagination.totalPages }));
        } else {
          // Use the last search filters
          const result = await searchRepos(lastSearchFilters, page, pagination.itemsPerPage);
          setFilteredRepos(result.repos);
          setPagination(prev => ({ ...prev, totalPages: result.pagination.totalPages }));
        }
      } catch (error) {
        console.error('Failed to fetch page:', error);
        setApiError('Falha ao buscar dados da API do GitHub. Usando dados simulados.');
        // No need to fallback here as we already have data
      } finally {
        setIsLoading(false);
      }
    }
    
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleTokenSet = () => {
    setHasToken(true);
    setShowTokenInput(false);
    // Default to mock data to avoid API errors
    setUseRealData(false);
    
    // Load mock data by default
    setFilteredRepos(data);
    setPagination({
      currentPage: 1,
      totalPages: Math.ceil(data.length / pagination.itemsPerPage),
      itemsPerPage: pagination.itemsPerPage
    });
  };
  
  const loadTrendingRepos = async () => {
    setIsLoading(true);
    setApiError(null);
    setSearchMode('trending');
    
    if (useRealData) {
      try {
        const result = await getTrendingRepos('weekly', 1, pagination.itemsPerPage);
        setFilteredRepos(result.repos);
        setPagination({
          currentPage: 1,
          totalPages: result.pagination.totalPages,
          itemsPerPage: pagination.itemsPerPage
        });
      } catch (error) {
        console.error('Failed to load trending repos:', error);
        setApiError('Falha ao buscar dados da API do GitHub. Usando dados simulados.');
        // Fallback to mock data
        setFilteredRepos(data);
        setPagination({
          currentPage: 1,
          totalPages: Math.ceil(data.length / pagination.itemsPerPage),
          itemsPerPage: pagination.itemsPerPage
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Just use mock data
      setFilteredRepos(data);
      setPagination({
        currentPage: 1,
        totalPages: Math.ceil(data.length / pagination.itemsPerPage),
        itemsPerPage: pagination.itemsPerPage
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between mb-4">
          <div>
            {hasToken && (
              <button
                onClick={() => setShowTokenInput(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Configurar Token
              </button>
            )}
          </div>
          <ThemeToggle />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            GitHub Repository
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"> Analysis</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore collaboration patterns and impact metrics in open source projects
          </p>
        </motion.div>

        {/* Banner da criadora */}
        <CreatorBanner />
        
        {hasToken && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowApiDemo(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300"
            >
              Testar API do GitHub
            </button>
          </div>
        )}

        {showTokenInput || !hasToken ? (
          <TokenInput onTokenSet={handleTokenSet} />
        ) : (
          <>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex space-x-2 mb-4 sm:mb-0">
                <button
                  onClick={() => {
                    setSearchMode('search');
                    handleSearch({query: ''});
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    searchMode === 'search'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Buscar Repositórios
                </button>
                <button
                  onClick={() => {
                    setSearchMode('trending');
                    loadTrendingRepos();
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    searchMode === 'trending'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Repositórios em Destaque
                </button>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">
                  Usando {useRealData ? 'dados reais do GitHub' : 'dados simulados'}
                </span>
                <button
                  onClick={() => {
                    setUseRealData(!useRealData);
                    setApiError(null);
                    if (searchMode === 'search') {
                      handleSearch(lastSearchFilters);
                    } else {
                      loadTrendingRepos();
                    }
                  }}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {useRealData ? 'Usar dados simulados' : 'Usar dados reais'}
                </button>
              </div>
            </div>

            {apiError && (
              <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 dark:text-yellow-200">
                      {apiError}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {searchMode === 'search' && (
              <SearchBar onSearch={handleSearch} />
            )}

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-12">
                {displayedRepos.length > 0 ? (
                  displayedRepos.map((repo, index) => (
                    <motion.div
                      key={repo.name}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <RepoCard repo={repo} />
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Nenhum repositório encontrado</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Tente ajustar seus filtros de busca</p>
                  </div>
                )}
              </div>
            )}
            
            <Pagination 
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </>
        )}
        
        {showApiDemo && <ApiDemo onClose={() => setShowApiDemo(false)} />}
      </div>
    </div>
  );
}

export default App;
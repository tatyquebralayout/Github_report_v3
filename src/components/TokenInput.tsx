import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Check, AlertCircle, Github, Shield } from 'lucide-react';
import { setGitHubToken } from '../services/githubService';

interface TokenInputProps {
  onTokenSet: () => void;
}

export function TokenInput({ onTokenSet }: TokenInputProps) {
  const [token, setToken] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToken, setShowToken] = useState(false);

  const validateToken = async () => {
    if (!token.trim()) {
      setErrorMessage('Por favor, insira um token');
      setIsValid(false);
      return;
    }

    // Basic format validation for GitHub tokens
    if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
      setErrorMessage('O token parece inválido. Tokens do GitHub geralmente começam com "ghp_" ou "github_pat_"');
      setIsValid(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Set the token in the service
      setGitHubToken(token);
      
      // Test the token by making a simple API call
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${token}`
        }
      });
      
      if (response.ok) {
        // Token is valid
        setIsValid(true);
        
        // Store token in localStorage
        localStorage.setItem('github_token', token);
        
        // Notify parent
        onTokenSet();
      } else {
        // Token is invalid
        const data = await response.json();
        setIsValid(false);
        setErrorMessage(`Erro ao validar token: ${data.message || 'Token inválido'}`);
      }
    } catch (error) {
      setIsValid(false);
      setErrorMessage('Erro ao validar o token. Verifique sua conexão com a internet.');
      console.error('Token validation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const continueWithoutToken = () => {
    // Just notify parent without setting a token
    onTokenSet();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl max-w-2xl mx-auto"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Github className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Autenticação GitHub</h2>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <Shield className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700 dark:text-blue-200">
              Para acessar a API do GitHub e buscar dados reais, precisamos de um token de acesso pessoal.
              Seu token será armazenado apenas no seu navegador e nunca será enviado para nossos servidores.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="token" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Token de Acesso Pessoal
          </label>
          <div className="relative">
            <input
              type={showToken ? "text" : "password"}
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showToken ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              )}
            </button>
          </div>
          {errorMessage && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errorMessage}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Não tem um token? Crie um{' '}
            <a
              href="https://github.com/settings/tokens/new"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              aqui
            </a>
            . Certifique-se de incluir os escopos: <code>repo</code>, <code>read:user</code>, <code>read:org</code>.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={validateToken}
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Validando...
              </>
            ) : isValid ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Token Validado
              </>
            ) : (
              'Validar Token'
            )}
          </button>
          
          <button
            onClick={continueWithoutToken}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Continuar com Dados Simulados
          </button>
        </div>
      </div>

      {isValid === true && (
        <div className="mt-4 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700 dark:text-green-200">
                Token validado com sucesso! Você pode agora acessar dados reais do GitHub.
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
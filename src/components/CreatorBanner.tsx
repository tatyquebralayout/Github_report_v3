import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Coffee } from 'lucide-react';

export function CreatorBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 shadow-sm mb-8 border border-blue-100 dark:border-blue-800"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative">
          <img 
            src="https://github.com/tatyquebralayout.png" 
            alt="Tatiana Quebra Layout" 
            className="w-20 h-20 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800"
          />
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Criado por <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">TATIANA BARROS</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            @tatyquebralayout · she/her |
            Technology Evangelist at Expresso-TS | Colunista Tech @midianinja | TEA/ADHD
          </p>
          
          <div className="flex items-center justify-center sm:justify-start space-x-3 mt-2">
            <a 
              href="https://github.com/tatyquebralayout" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/umataldetatiana" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/umataldetatiana" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a 
            href="https://github.com/sponsors/tatyquebralayout" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:shadow-lg transition-all duration-300"
          >
            <div className="relative mr-2">
              <Coffee className="w-5 h-5" />
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ 
                  opacity: [0, 0.7, 0],
                  y: [-5, -10, -15]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  repeatDelay: 1
                }}
                className="absolute -top-1 left-0 w-3 h-3 bg-white rounded-full blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  y: [-5, -8, -12]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                  delay: 0.5,
                  repeatDelay: 1
                }}
                className="absolute -top-1 left-1 w-2 h-2 bg-white rounded-full blur-sm"
              />
            </div>
            <span className="font-medium">Me pague um café</span>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
import { useState, useCallback } from 'react';
import { SearchResult } from '../types';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback((text: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setCurrentSearchIndex(0);
      return;
    }

    setIsSearching(true);
    
    try {
      const query = searchQuery.toLowerCase();
      const textLower = text.toLowerCase();
      const results: SearchResult[] = [];
      
      // Find all matches (supports phrases and partial matches)
      let startIndex = 0;
      while (true) {
        const index = textLower.indexOf(query, startIndex);
        if (index === -1) break;
        
        // Get context around the match
        const contextStart = Math.max(0, index - 50);
        const contextEnd = Math.min(text.length, index + query.length + 50);
        let contextText = text.substring(contextStart, contextEnd);
        
        // Add ellipsis if we're not at the beginning/end
        if (contextStart > 0) contextText = '...' + contextText;
        if (contextEnd < text.length) contextText = contextText + '...';
        
        results.push({
          index: index,
          text: contextText
        });
        
        startIndex = index + 1;
      }
      
      setSearchResults(results);
      setCurrentSearchIndex(results.length > 0 ? 0 : -1);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setCurrentSearchIndex(-1);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery]);

  const navigateSearchResults = useCallback((direction: 'next' | 'prev') => {
    if (searchResults.length === 0) return;
    
    if (direction === 'next') {
      setCurrentSearchIndex((prev) => 
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else {
      setCurrentSearchIndex((prev) => 
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    }
  }, [searchResults.length]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setCurrentSearchIndex(0);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    currentSearchIndex,
    isSearching,
    handleSearch,
    navigateSearchResults,
    clearSearch
  };
};

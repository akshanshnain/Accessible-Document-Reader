import { useState } from 'react';
import { Bookmark } from '../types';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const addBookmark = (currentText: string) => {
    if (currentText) {
      const bookmark: Bookmark = {
        id: `bookmark_${Date.now()}`,
        text: currentText.substring(0, 100) + '...',
        position: 0
      };
      setBookmarks([...bookmarks, bookmark]);
    }
  };

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark
  };
};

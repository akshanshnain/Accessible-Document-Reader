import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Bookmark } from '../../types';

interface BookmarkPanelProps {
  bookmarks: {
    bookmarks: Bookmark[];
    addBookmark: (text: string) => void;
    removeBookmark: (id: string) => void;
  };
}

const BookmarkPanel: React.FC<BookmarkPanelProps> = ({ bookmarks }) => {
  const { bookmarks: bookmarkList } = bookmarks;

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Bookmarks ({bookmarkList.length})
      </Typography>
      {bookmarkList.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No bookmarks yet. Press 'B' to add one.
        </Typography>
      ) : (
        <Box>
          {bookmarkList.map((bookmark) => (
            <Chip
              key={bookmark.id}
              label={bookmark.text}
              size="small"
              sx={{ m: 0.5 }}
              onClick={() => {/* Navigate to bookmark */}}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BookmarkPanel;

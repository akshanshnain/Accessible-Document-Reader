import React, { useRef } from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  isProcessing: boolean;
  onFileUpload: (file: File) => Promise<void>;
}

const FileUpload: React.FC<FileUploadProps> = ({ isProcessing, onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png', '.tiff', '.bmp', '.gif']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        await onFileUpload(acceptedFiles[0]);
      }
    },
    disabled: isProcessing
  });

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 4,
        textAlign: 'center',
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.300',
        backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
        cursor: isProcessing ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'action.hover',
        },
      }}
      role="button"
      tabIndex={0}
      aria-label={isDragActive ? 'Drop your document here' : 'Drag and drop a document here, or click to browse'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }}
    >
      <input {...getInputProps()} ref={fileInputRef} />
      <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        {isDragActive ? 'Drop your document here' : 'Drag & drop a document here'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Supports PDF, JPG, PNG, TIFF, BMP (Max 50MB)
      </Typography>
      <Button 
        variant="contained" 
        sx={{ mt: 2 }}
        disabled={isProcessing}
        aria-label="Browse files"
        onClick={() => fileInputRef.current?.click()}
      >
        Browse Files
      </Button>
    </Paper>
  );
};

export default FileUpload;

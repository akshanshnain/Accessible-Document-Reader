import { useState } from 'react';
import Tesseract from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import { DocumentData } from '../types';

export const useDocumentProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<DocumentData | null>(null);

  // Set the worker source for PDF.js
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

  const processPDF = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const arrayBuffer = reader.result as ArrayBuffer;
          
          const pdf = await pdfjsLib.getDocument({ 
            data: arrayBuffer,
            useWorkerFetch: false,
            isEvalSupported: false,
            useSystemFonts: true,
          }).promise;
          
          let fullText = '';
          
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            
            const pageText = textContent.items
              .map((item: any) => item.str)
              .join(' ');
            
            fullText += pageText + '\n\n';
          }
          
          resolve(fullText.trim() || 'No text found in PDF');
        } catch (error) {
          console.error('Error processing PDF:', error);
          resolve(`PDF file "${file.name}" uploaded. Text extraction failed: ${error.message}. Try with an image file instead.`);
        }
      };
      
      reader.onerror = () => {
        resolve('Failed to read PDF file. Please try again.');
      };
      
      reader.readAsArrayBuffer(file);
    });
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    
    try {
      let extractedText = '';
      let confidence = 0;
      let processingTime = 0;
      
      const startTime = Date.now();
      
      if (file.type === 'application/pdf') {
        extractedText = await processPDF(file);
        confidence = 0.9;
      } else if (file.type.startsWith('image/')) {
        const result = await Tesseract.recognize(file, 'eng', {
          logger: m => console.log(m)
        });
        
        extractedText = result.data.text;
        confidence = result.data.confidence / 100;
      }
      
      processingTime = Date.now() - startTime;
      
      const wordCount = extractedText.split(/\s+/).filter(word => word.length > 0).length;
      
      const documentData: DocumentData = {
        id: Date.now().toString(),
        filename: file.name,
        fileType: file.type,
        text: extractedText,
        confidence,
        processingTime,
        wordCount
      };
      
      setCurrentDocument(documentData);
      
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    currentDocument,
    processFile
  };
};

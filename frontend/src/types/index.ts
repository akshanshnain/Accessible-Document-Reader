export interface DocumentData {
  id: string;
  filename: string;
  fileType: string;
  text: string;
  confidence: number;
  processingTime: number;
  wordCount: number;
}

export interface SpeechSettings {
  rate: number;
  volume: number;
}

export interface SearchResult {
  index: number;
  text: string;
}

export interface Bookmark {
  id: string;
  text: string;
  position: number;
}

export interface VoiceInfo {
  name: string;
  lang: string;
  default: boolean;
}

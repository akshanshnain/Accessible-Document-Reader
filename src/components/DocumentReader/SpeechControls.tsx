import React from 'react';
import { Box, Typography, TextField, MenuItem, IconButton, Slider, Tooltip } from '@mui/material';
import { PlayArrow as PlayIcon, Pause as PauseIcon, Stop as StopIcon, VolumeUp as VolumeIcon } from '@mui/icons-material';

interface SpeechControlsProps {
  speechSynthesis: {
    isPlaying: boolean;
    isPaused: boolean;
    availableVoices: SpeechSynthesisVoice[];
    selectedVoice: SpeechSynthesisVoice | null;
    setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
    speechSettings: { rate: number; volume: number };
    setSpeechSettings: (settings: { rate: number; volume: number }) => void;
    speakText: (text: string) => void;
    pauseSpeech: () => void;
    resumeSpeech: () => void;
    stopSpeech: () => void;
    testVoice: () => void;
    currentText: string;
  };
  documentText: string; // Add this prop
}

const SpeechControls: React.FC<SpeechControlsProps> = ({ speechSynthesis, documentText }) => {
  const {
    isPlaying,
    isPaused,
    availableVoices,
    selectedVoice,
    setSelectedVoice,
    speechSettings,
    setSpeechSettings,
    speakText,
    pauseSpeech,
    resumeSpeech,
    stopSpeech,
    testVoice  } = speechSynthesis;

  const handlePlay = () => {
    if (isPaused) {
      resumeSpeech();
    } else {
      // Use documentText instead of currentText
      speakText(documentText);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        Text-to-Speech
      </Typography>
      
      {/* Voice Selection */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>
          Voice Selection
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            select
            fullWidth
            size="small"
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = availableVoices.find((v: any) => v.name === e.target.value);
              setSelectedVoice(voice || null);
            }}
            label="Select Voice"
            aria-label="Select text-to-speech voice"
          >
            {availableVoices.map((voice: any) => (
              <MenuItem key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </MenuItem>
            ))}
          </TextField>
          <IconButton 
            onClick={testVoice}
            aria-label="Test selected voice"
            size="small"
          >
            <VolumeIcon />
          </IconButton>
        </Box>
        
        {/* Voice Information */}
        {selectedVoice && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            {selectedVoice.name} • {selectedVoice.lang} • {selectedVoice.default ? 'Default' : 'Available'}
          </Typography>
        )}
      </Box>
      
      {/* Speech Controls */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Tooltip title="Play (Space)" aria-label="Play text-to-speech">
          <IconButton onClick={handlePlay} color="primary" disabled={!documentText}>
            <PlayIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Pause" aria-label="Pause text-to-speech">
          <span>
            <IconButton onClick={pauseSpeech} disabled={!isPlaying}>
              <PauseIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Stop (Escape)" aria-label="Stop text-to-speech">
          <span>
            <IconButton onClick={stopSpeech} disabled={!isPlaying}>
              <StopIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
      
      {/* Speech Settings */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>
          Speech Rate: {speechSettings.rate}x
        </Typography>
        <Slider
          value={speechSettings.rate}
          onChange={(e, newValue) => {
            const newRate = newValue as number;
            setSpeechSettings({...speechSettings, rate: newRate});
            
            if (isPlaying) {
              speakText(documentText);
            }
          }}
          min={0.5}
          max={2.0}
          step={0.1}
          aria-label="Speech rate"
        />
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>
          Volume: {Math.round(speechSettings.volume * 100)}%
        </Typography>
        <Slider
          value={speechSettings.volume}
          onChange={(e, newValue) => setSpeechSettings({...speechSettings, volume: newValue as number})}
          min={0}
          max={1}
          step={0.1}
          aria-label="Volume"
        />
      </Box>
    </Box>
  );
};

export default SpeechControls;

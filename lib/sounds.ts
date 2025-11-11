// Sound utility functions for the application

// Sound library with different types of sounds
const SOUNDS = {
  typing: [
    'https://assets.mixkit.co/active_storage/sfx/2856/2856-preview.mp3',
    'https://assets.mixkit.co/active_storage/sfx/2857/2857-preview.mp3',
    'https://assets.mixkit.co/active_storage/sfx/2858/2858-preview.mp3'
  ],
  success: 'https://assets.mixkit.co/active_storage/sfx/2706/2706-preview.mp3',
  error: 'https://assets.mixkit.co/active_storage/sfx/2705/2705-preview.mp3',
  notification: 'https://assets.mixkit.co/active_storage/sfx/2708/2708-preview.mp3',
  pageTransition: 'https://assets.mixkit.co/active_storage/sfx/2863/2863-preview.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2653/2653-preview.mp3'
};

// Audio context for better sound management
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export const playSound = async (type: keyof typeof SOUNDS, volume = 0.3) => {
  try {
    let soundUrl: string;
    
    // For typing, pick a random sound from the typing array
    if (type === 'typing') {
      const typingSounds = SOUNDS.typing as string[];
      soundUrl = typingSounds[Math.floor(Math.random() * typingSounds.length)];
    } else {
      soundUrl = SOUNDS[type] as string;
    }

    const response = await fetch(soundUrl);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await getAudioContext().decodeAudioData(arrayBuffer);
    
    const source = getAudioContext().createBufferSource();
    source.buffer = audioBuffer;
    
    const gainNode = getAudioContext().createGain();
    gainNode.gain.value = volume;
    
    source.connect(gainNode);
    gainNode.connect(getAudioContext().destination);
    
    source.start(0);
    return source;
  } catch (error) {
    console.error('Error playing sound:', error);
    // Fallback to HTML5 Audio if Web Audio API fails
    const audio = new Audio(type === 'typing' 
      ? SOUNDS.typing[0] 
      : SOUNDS[type] as string
    );
    audio.volume = volume;
    audio.play().catch(e => console.log('Audio play failed:', e));
  }
};

export const playTypingSound = () => playSound('typing', 0.15);
export const playSuccessSound = () => playSound('success', 0.3);
export const playErrorSound = () => playSound('error', 0.3);
export const playNotificationSound = () => playSound('notification', 0.3);
export const playPageTransitionSound = () => playSound('pageTransition', 0.2);
export const playClickSound = () => playSound('click', 0.2);

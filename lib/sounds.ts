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
const audioCache: Record<string, AudioBuffer> = {};

const getAudioContext = (): AudioContext => {
  if (typeof window === 'undefined') {
    throw new Error('AudioContext is not available in this environment');
  }
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Preload sounds for better performance
const preloadSounds = async () => {
  if (typeof window === 'undefined') return;
  
  try {
    const context = getAudioContext();
    
    // Create a set of unique sound URLs to preload
    const soundUrls = new Set<string>();
    Object.values(SOUNDS).forEach(sound => {
      if (Array.isArray(sound)) {
        sound.forEach(url => soundUrls.add(url));
      } else {
        soundUrls.add(sound);
      }
    });

    // Preload all sounds
    await Promise.all(
      Array.from(soundUrls).map(async (url) => {
        if (!audioCache[url]) {
          try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            audioCache[url] = await context.decodeAudioData(arrayBuffer);
          } catch (error) {
            console.error(`Failed to preload sound: ${url}`, error);
          }
        }
      })
    );
  } catch (error) {
    console.error('Error preloading sounds:', error);
  }
};

// Initialize audio on user interaction to comply with autoplay policies
const initializeAudio = () => {
  if (typeof window === 'undefined') return;
  
  // Resume audio context on first user interaction
  const handleFirstInteraction = async () => {
    try {
      // Try to resume the audio context
      if (audioContext?.state === 'suspended') {
        await audioContext.resume();
      }
      
      // Preload sounds after first interaction
      await preloadSounds();
      
      // Remove the event listener after first interaction
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  };

  // Add event listeners for first user interaction
  window.addEventListener('click', handleFirstInteraction, { once: true });
  window.addEventListener('keydown', handleFirstInteraction, { once: true });
  window.addEventListener('touchstart', handleFirstInteraction, { once: true });
};

// Initialize audio when the module loads
if (typeof window !== 'undefined') {
  initializeAudio();
}

export const playSound = async (type: keyof typeof SOUNDS, volume = 0.3) => {
  // If we're on the server, do nothing
  if (typeof window === 'undefined') return;

  try {
    // Ensure audio context is available
    const context = getAudioContext();
    
    // Get the sound URL
    let soundUrl: string;
    if (type === 'typing') {
      const typingSounds = SOUNDS.typing as string[];
      soundUrl = typingSounds[Math.floor(Math.random() * typingSounds.length)];
    } else {
      soundUrl = SOUNDS[type] as string;
    }

    // Try to use Web Audio API first
    try {
      // Check if we have a cached version
      let audioBuffer = audioCache[soundUrl];
      
      // If not in cache, load it
      if (!audioBuffer) {
        const response = await fetch(soundUrl);
        const arrayBuffer = await response.arrayBuffer();
        audioBuffer = await context.decodeAudioData(arrayBuffer);
        audioCache[soundUrl] = audioBuffer;
      }
      
      // Create and configure the audio source
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      
      // Create and configure the gain node for volume control
      const gainNode = context.createGain();
      gainNode.gain.value = volume;
      
      // Connect the nodes and start playing
      source.connect(gainNode);
      gainNode.connect(context.destination);
      
      // Handle iOS autoplay restrictions
      if (context.state === 'suspended') {
        await context.resume();
      }
      
      source.start(0);
      return source;
    } catch (webAudioError) {
      console.warn('Web Audio API failed, falling back to HTML5 Audio:', webAudioError);
      throw webAudioError; // This will trigger the HTML5 Audio fallback
    }
  } catch (error) {
    // Fallback to HTML5 Audio if Web Audio API fails
    try {
      const audio = new Audio(type === 'typing' 
        ? SOUNDS.typing[0] 
        : SOUNDS[type] as string
      );
      audio.volume = volume;
      
      // Handle autoplay restrictions
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log('Audio play was prevented:', e);
          // Show a message to the user that they need to interact first
          console.info('Please interact with the page to enable sound');
        });
      }
      
      return audio;
    } catch (html5Error) {
      console.error('HTML5 Audio also failed:', html5Error);
    }
  }
};

// Export sound player functions with appropriate volume levels
export const playTypingSound = () => playSound('typing', 0.15);
export const playSuccessSound = () => playSound('success', 0.4);
export const playErrorSound = () => playSound('error', 0.4);
export const playNotificationSound = () => playSound('notification', 0.3);
export const playPageTransitionSound = () => playSound('pageTransition', 0.25);
export const playClickSound = () => playSound('click', 0.25);

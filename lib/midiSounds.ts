// MIDI sound utility for Opera GX and other browsers with Web MIDI API support

type MidiNote = {
  note: number;  // MIDI note number (0-127)
  duration: number; // in milliseconds
  velocity?: number; // 0-127, default 64
};

// Common MIDI notes for sound effects
const NOTES = {
  C4: 60,
  D4: 62,
  E4: 64,
  F4: 65,
  G4: 67,
  A4: 69,
  B4: 71,
  C5: 72,
} as const;

// Sound presets
const SOUNDS = {
  click: [
    { note: NOTES.C5, duration: 50, velocity: 40 },
  ],
  typing: [
    { note: NOTES.C5, duration: 30, velocity: 30 },
    { note: NOTES.D4, duration: 30, velocity: 30 },
    { note: NOTES.E4, duration: 30, velocity: 30 },
  ],
  success: [
    { note: NOTES.C5, duration: 100, velocity: 60 },
    { note: NOTES.E5, duration: 100, velocity: 60 },
    { note: NOTES.G5, duration: 200, velocity: 50 },
  ],
  error: [
    { note: NOTES.C5, duration: 100, velocity: 80 },
    { note: NOTES.A3, duration: 200, velocity: 90 },
  ],
  notification: [
    { note: NOTES.A4, duration: 100, velocity: 50 },
    { note: NOTES.C5, duration: 100, velocity: 40 },
  ],
} as const;

class MidiPlayer {
  private midiAccess: WebMidi.MIDIAccess | null = null;
  private output: WebMidi.MIDIOutput | null = null;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return true;
    
    try {
      if (!navigator.requestMIDIAccess) {
        console.warn('Web MIDI API is not supported in this browser');
        return false;
      }

      this.midiAccess = await navigator.requestMIDIAccess({ sysex: false });
      const outputs = Array.from(this.midiAccess.outputs.values());
      
      // Try to find a suitable MIDI output
      this.output = outputs.find(o => o.name.includes('GX Audio') || o.name.includes('Microsoft')) || outputs[0];
      
      if (!this.output) {
        console.warn('No MIDI output devices found');
        return false;
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Error initializing MIDI:', error);
      return false;
    }
  }

  async playSound(soundName: keyof typeof SOUNDS) {
    if (!this.isInitialized) {
      const initialized = await this.initialize();
      if (!initialized) return;
    }

    const notes = SOUNDS[soundName];
    if (!notes) return;

    const now = performance.now();
    
    notes.forEach((note, index) => {
      const delay = index * 50; // Small delay between notes in a chord
      
      setTimeout(() => {
        this.playNote({
          note: note.note,
          duration: note.duration,
          velocity: note.velocity || 64,
        });
      }, delay);
    });
  }

  private playNote({ note, duration, velocity = 64 }: MidiNote) {
    if (!this.output) return;
    
    // Note on
    this.output.send([0x90, note, velocity]);
    
    // Note off after duration
    setTimeout(() => {
      if (this.output) {
        this.output.send([0x80, note, 0]);
      }
    }, duration);
  }
}

// Create a singleton instance
const midiPlayer = new MidiPlayer();

// Export simple sound functions
export const playMidiClick = () => midiPlayer.playSound('click');
export const playMidiTyping = () => midiPlayer.playSound('typing');
export const playMidiSuccess = () => midiPlayer.playSound('success');
export const playMidiError = () => midiPlayer.playSound('error');
export const playMidiNotification = () => midiPlayer.playSound('notification');

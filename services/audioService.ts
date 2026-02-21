
import { MusicIntensity } from '../types';

/**
 * Singleton service for managing a generative "Lo-Fi" soundscape using Web Audio API.
 * Generates sound in real-time (Synthesizers) to ensure audio works without external files.
 */
class AudioService {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambienceGain: GainNode | null = null;
  private isMuted = false;
  private isInitialized = false;
  private currentIntensity: MusicIntensity = MusicIntensity.SILENT;

  // Active nodes
  private musicNodes: AudioScheduledSourceNode[] = [];
  private ambienceNodes: AudioScheduledSourceNode[] = [];
  
  /**
   * Initialize AudioContext. Must be called after user gesture.
   */
  async initialize() {
    if (this.isInitialized && this.audioContext) {
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
        return;
    }

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.audioContext = new AudioContextClass();
    
    // MASTER CHAIN
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = 0.35; 

    // Ambience Sub-mix
    this.ambienceGain = this.audioContext.createGain();
    this.ambienceGain.gain.value = 0.15; 
    this.ambienceGain.connect(this.masterGain);

    // Dynamics Compressor (Safety & Vibe)
    const compressor = this.audioContext.createDynamicsCompressor();
    compressor.threshold.value = -12;
    compressor.ratio.value = 12;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;
    compressor.connect(this.audioContext.destination);

    this.masterGain.connect(compressor);
    
    this.isInitialized = true;

    if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
    }
  }

  startMusic() {
    if (!this.audioContext || !this.masterGain) return;
    this.updateMusicState();
  }

  setIntensity(intensity: MusicIntensity) {
    if (this.currentIntensity === intensity) return;
    this.currentIntensity = intensity;
    this.updateMusicState();
  }

  // --- NEW MUSIC ENGINE: EXCITING BUT COMFORTABLE ---
  // Style: Lo-Fi House / Chillwave. 
  // Comfortable Pads + Driving Pulse + Warm Bass.
  private updateMusicState() {
      this.stopMusicNodes();

      if (this.currentIntensity === MusicIntensity.SILENT || !this.audioContext || !this.masterGain) return;

      const now = this.audioContext.currentTime;
      const bpm = 110; // Faster tempo for excitement
      const beat = 60 / bpm;

      // 1. THE PAD (Comfort) - Always present but evolves
      // Using a Triangle wave for warmth, with slow attack
      const padOsc = this.audioContext.createOscillator();
      padOsc.type = 'triangle';
      padOsc.frequency.setValueAtTime(130.81, now); // C3
      
      const padGain = this.audioContext.createGain();
      padGain.gain.setValueAtTime(0, now);
      padGain.gain.linearRampToValueAtTime(0.15, now + 2); // Quick fade in
      
      // Sidechain effect (Pumping) to add rhythm/excitement
      const pumpLfo = this.audioContext.createOscillator();
      pumpLfo.frequency.value = bpm / 60; // Beat frequency
      const pumpGain = this.audioContext.createGain();
      pumpGain.gain.value = 0.05; 
      pumpLfo.connect(pumpGain);
      pumpGain.connect(padGain.gain); // Modulate volume

      padOsc.connect(padGain);
      padGain.connect(this.masterGain);
      padOsc.start();
      pumpLfo.start();
      
      // @ts-ignore
      padOsc.gainParam = padGain.gain;
      this.musicNodes.push(padOsc, pumpLfo);

      // 2. THE PULSE (Excitement) - Procedural Kick Drum
      // Only in FOCUS or TENSION modes
      if (this.currentIntensity === MusicIntensity.FOCUS || this.currentIntensity === MusicIntensity.TENSION) {
          const kickOsc = this.audioContext.createOscillator();
          kickOsc.type = 'sine';
          
          const kickGain = this.audioContext.createGain();
          kickGain.gain.value = 0;

          // Create a loop for the kick
          // Since we can't easily loop AudioParams without a scheduler, we use an LFO to gate noise? 
          // No, simpler: Use a low square wave LFO to trigger volume bursts.
          
          const rhythmOsc = this.audioContext.createOscillator();
          rhythmOsc.type = 'square';
          rhythmOsc.frequency.value = bpm / 60; // Quarter notes
          
          const rhythmGain = this.audioContext.createGain();
          rhythmGain.gain.value = 0.2; // Volume of the "beat"
          
          // Connect rhythm to output
          rhythmOsc.connect(rhythmGain);
          
          // Filter to make it sound like a muffled kick (Comfort)
          const kickFilter = this.audioContext.createBiquadFilter();
          kickFilter.type = 'lowpass';
          kickFilter.frequency.value = 150; // Low thud
          kickFilter.Q.value = 1;

          rhythmGain.connect(kickFilter);
          kickFilter.connect(this.masterGain);
          rhythmOsc.start();
          
          // @ts-ignore
          rhythmOsc.gainParam = rhythmGain.gain;
          this.musicNodes.push(rhythmOsc);
      }

      // 3. THE ARP (Energy) - High frequency movement
      if (this.currentIntensity === MusicIntensity.TENSION) {
          const arpOsc = this.audioContext.createOscillator();
          arpOsc.type = 'sine';
          arpOsc.frequency.setValueAtTime(523.25, now); // C5
          
          const arpGain = this.audioContext.createGain();
          arpGain.gain.value = 0.05;
          
          // Fast sequence LFO (16th notes)
          const seqLfo = this.audioContext.createOscillator();
          seqLfo.type = 'square';
          seqLfo.frequency.value = (bpm / 60) * 4; 
          
          const seqGain = this.audioContext.createGain();
          seqGain.gain.value = 0.05;
          
          seqLfo.connect(seqGain);
          seqGain.connect(arpGain.gain);
          
          arpOsc.connect(arpGain);
          arpGain.connect(this.masterGain);
          
          arpOsc.start();
          seqLfo.start();
          
          this.musicNodes.push(arpOsc, seqLfo);
      }
  }

  private stopMusicNodes() {
      this.musicNodes.forEach(n => {
          try { 
              // @ts-ignore
              if (n.gainParam) { 
                  // @ts-ignore
                  n.gainParam.linearRampToValueAtTime(0, this.audioContext!.currentTime + 0.5);
                  n.stop(this.audioContext!.currentTime + 0.5); 
              } else {
                  n.stop(); 
              }
          } catch(e){}
      });
      this.musicNodes = [];
  }

  // --- AMBIENCE GENERATOR ---
  playAmbience(type: 'OFFICE' | 'FACTORY' | 'RAIN' | 'ROOF' | null) {
      if (!this.audioContext || !this.ambienceGain) return;

      this.ambienceNodes.forEach(n => { try { n.stop(); } catch(e){} });
      this.ambienceNodes = [];

      if (!type) return;

      const bufferSize = 2 * this.audioContext.sampleRate;
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate Pink/Brown Noise
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5; 
      }

      const noiseNode = this.audioContext.createBufferSource();
      noiseNode.buffer = buffer;
      noiseNode.loop = true;

      const filter = this.audioContext.createBiquadFilter();
      
      if (type === 'OFFICE') {
          filter.type = 'lowpass';
          filter.frequency.value = 300;
          this.ambienceGain.gain.value = 0.1; 
      } else if (type === 'FACTORY') {
          filter.type = 'lowpass';
          filter.frequency.value = 150;
          this.ambienceGain.gain.value = 0.25; 
      } else if (type === 'RAIN' || type === 'ROOF') {
          filter.type = 'lowpass';
          filter.frequency.value = 800;
          this.ambienceGain.gain.value = 0.15;
      }

      noiseNode.connect(filter);
      filter.connect(this.ambienceGain);
      noiseNode.start();
      
      this.ambienceNodes.push(noiseNode);
  }

  toggleMute() {
      if (!this.masterGain || !this.audioContext) return false;
      this.isMuted = !this.isMuted;
      const now = this.audioContext.currentTime;
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.35, now, 0.2);
      return this.isMuted;
  }

  playSFX(key: 'HOVER' | 'CLICK' | 'SUCCESS' | 'ERROR' | 'SWIPE' | 'VALVE' | 'LAUNCH' | 'PICKUP' | 'DROP' | 'TYPE') {
    if (!this.audioContext || !this.masterGain || this.isMuted) return;
    if (this.audioContext.state === 'suspended') this.audioContext.resume();

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(this.masterGain);

    // Short, snappy envelopes for UI feel
    switch (key) {
        case 'HOVER':
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.05);
            break;
        case 'CLICK':
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.1);
            break;
        case 'SUCCESS':
            this.playNote(523.25, now, 0.2, 'triangle');
            this.playNote(659.25, now + 0.05, 0.2, 'triangle');
            this.playNote(1046.50, now + 0.1, 0.4, 'sine');
            return; 
        case 'ERROR':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, now);
            osc.frequency.linearRampToValueAtTime(50, now + 0.3);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.3);
            break;
        case 'PICKUP':
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.linearRampToValueAtTime(500, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.1);
            break;
        case 'DROP':
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.15);
            break;
        case 'TYPE':
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, now);
            gain.gain.setValueAtTime(0.02, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
            break;
        default:
            osc.start(now);
            osc.stop(now + 0.1);
            return;
    }
    
    osc.start(now);
    osc.stop(now + 0.3);
  }

  private playNote(freq: number, time: number, duration: number, type: OscillatorType) {
      if (!this.audioContext || !this.masterGain) return;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.1, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(time);
      osc.stop(time + duration);
  }
}

export const audioService = new AudioService();

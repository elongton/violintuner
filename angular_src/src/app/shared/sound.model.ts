import { AudioContextProxy } from 'angular-audio-context/build/es2018/audio-context-proxy';
import { IOscillatorNode, IGainNode } from 'standardized-audio-context';

export class Sound {
    constructor(private context: AudioContextProxy) {
      this.context = context;
    }
    oscillator: IOscillatorNode;
    gainNode: IGainNode;
  
    init() {
      this.oscillator = this.context.createOscillator();
      this.gainNode = this.context.createGain();
  
      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.context.destination);
    }
  
    play() {
      this.init();
      this.oscillator.frequency.setValueAtTime(440, this.context.currentTime); 
      // this.gainNode.gain.setValueAtTime(0.5, this.context.currentTime);
      this.oscillator.start();
    }
    
  
    adjustVolume(gain: any){
      this.gainNode.gain.setValueAtTime(gain, this.context.currentTime);
    }
  
    stop() {
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + .5);
      this.oscillator.stop(this.context.currentTime + 1);
    }
  }
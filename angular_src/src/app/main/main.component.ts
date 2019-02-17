import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material';
import { Sound } from '../shared/sound.model';
import { CookieService } from 'ngx-cookie-service';
import { AudioContext } from 'angular-audio-context';
import { FeedbackService } from '../feedback/feedback.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  //ripple
  @ViewChild(MatRipple) ripple: MatRipple;
  rippleRepeater;
  rippleStarter;
  //slider
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 1;
  min = 0;
  showTicks = false;
  step = 0.001;
  thumbLabel = false;
  volumeSliderValue: Number;
  vertical = false;



  sound: Sound;
  wave : OscillatorType;
  state: string;
  toggleState: string = 'off';

  constructor(private cookie: CookieService,
              private _audioContext: AudioContext,
              private fbservice: FeedbackService){
    let context = _audioContext;
    this.sound = new Sound(context);
    this.sound.init();
    this.wave = 'square';
  }
  ngOnInit() {
    if(this.cookie.get('volume_slider_value')){
      let textvalue = this.cookie.get('volume_slider_value');
      this.volumeSliderValue = Number(textvalue);
    }else{
      this.volumeSliderValue = 0.5;
    }

    // this.fbservice.getFeedback();
    
  }

  play(){
    if (this.toggleState == 'off'){
      this.rippleStarter = setTimeout(()=>{
        this.launchRipple();
      },1000)
      
      this.sound.play();
      this.sound.adjustVolume(this.volumeSliderValue)
      this.sound.oscillator.type = this.wave;
      
      this.toggleState = 'on';
    }else{
      this.sound.stop();
      clearTimeout(this.rippleRepeater);
      clearTimeout(this.rippleStarter);
      this.toggleState = 'off';
    }

  }


  onSliderChange(volumeSliderValue:number){
    this.sound.adjustVolume(volumeSliderValue)
    this.cookie.set('volume_slider_value', volumeSliderValue.toString());
  }


  launchRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true,
      centered: true,
      radius: 500,
      animation: {
        enterDuration: 500,
        exitDuration: 3000,
      }
    });

    // Fade out the ripple later.
    rippleRef.fadeOut();
    this.rippleRepeater = setTimeout(()=>{this.launchRipple()}, 2000);
  }

}
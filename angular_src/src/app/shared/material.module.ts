import { NgModule} from '@angular/core';

//Slider
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

//Buttons & Indicators
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
//Popups & Modals
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    //Form Controls
    MatSliderModule,
    MatSlideToggleModule,
    //Buttons & Indicators
    MatButtonModule,
    MatRippleModule,
    //Popups & Modals
    MatTooltipModule,
    MatIconModule,
  ],
  exports: [
    //Form Controls
    MatSliderModule,
    MatSlideToggleModule,

    //Buttons & Indicators
    MatButtonModule,
    MatRippleModule,
    //Popups & Modals
    MatTooltipModule,
    MatIconModule,
  ]
})

export class MaterialModule{}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/material.module';
import { MainComponent } from './main/main.component';
import { CookieService } from 'ngx-cookie-service';
import { AudioContextModule } from 'angular-audio-context';
import { FeedbackComponent, FeedbackDialog } from './feedback/feedback.component';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FeedbackComponent,
    FeedbackDialog,
  ],
  entryComponents: [
    FeedbackDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    MaterialModule,
    AudioContextModule.forRoot('balanced'),
  ],
  providers: [CookieService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}],
  bootstrap: [AppComponent]
})
export class AppModule { }


// , {provide: LocationStrategy, useClass: HashLocationStrategy}
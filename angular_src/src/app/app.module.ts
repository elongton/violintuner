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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { FeedbackService } from './feedback/feedback.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

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
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'violintuner' }),
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AudioContextModule.forRoot('balanced'),
  ],
  providers: [CookieService,
              {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
              FeedbackService],
  bootstrap: [AppComponent]
})
export class AppModule { }


// , {provide: LocationStrategy, useClass: HashLocationStrategy}
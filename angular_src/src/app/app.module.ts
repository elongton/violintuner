import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/material.module';
import { MainComponent } from './main/main.component';
import { CookieService } from 'ngx-cookie-service';
import { AudioContextModule } from 'angular-audio-context';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MaterialModule,
    AudioContextModule.forRoot('balanced'),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }


// , {provide: LocationStrategy, useClass: HashLocationStrategy}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {HeaderComponent} from './navigation/header/header.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {environment} from '../environments/environment';
import {AuthModule} from './auth/auth.module';
import {AuthService} from './auth/auth.service';
import {UIService} from './shared/ui.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {QuizService} from './quiz/quiz.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService, QuizService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { FormsModule } from '@angular/forms';
import {PopupModule} from 'ng2-opd-popup';

const firebase = {
  apiKey: "AIzaSyDPlk39ay7qvgW7qUrCft-iidepBz1znk0",
    authDomain: "test1-3b33f.firebaseapp.com",
    databaseURL: "https://test1-3b33f.firebaseio.com",
    projectId: "test1-3b33f",
    storageBucket: "test1-3b33f.appspot.com",
    messagingSenderId: "807374393373"
};

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ProductComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    PopupModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CommonModule } from '@angular/common';
import { SignInUpComponent } from './components/sign-in-up/sign-in-up.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ProfileComponent, SignInUpComponent, NoPageFoundComponent],
  imports: [BrowserModule, AppRoutingModule, CommonModule],
providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

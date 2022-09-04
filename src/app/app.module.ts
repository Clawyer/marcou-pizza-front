import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { GeoApiGouvAddressModule } from '@placeme/ngx-geo-api-gouv-address';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/general/home/home.component';
import { LoginComponent } from './modules/general/login/login.component';
import { SignupComponent } from './modules/general/signup/signup.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { FooterComponent } from './modules/layout/footer/footer.component';
import { HeaderComponent } from './modules/layout/header/header.component';
import { ProfileComponent } from './modules/general/profile/profile.component';
import { AdminComponent } from './modules/general/admin/admin.component';
import { ConfirmEmailComponent } from './modules/general/signup/confirm-email/confirm-email.component';

// Material Modules
import { NgMaterialModule } from './ng-material/ng-material.module';
import { SnackbarComponent } from './modules/layout/ng-material/snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    ProfileComponent,
    ConfirmEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GeoApiGouvAddressModule.forRoot(),
    NgMaterialModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}

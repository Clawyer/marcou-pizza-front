import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInUpComponent } from './components/sign-in-up/sign-in-up.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'account', component: SignInUpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

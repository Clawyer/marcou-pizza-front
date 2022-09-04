import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/general/admin/admin.component';
import { HomeComponent } from './modules/general/home/home.component';
import { LoginComponent } from './modules/general/login/login.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { ProfileComponent } from './modules/general/profile/profile.component';
import { ConfirmEmailComponent } from './modules/general/signup/confirm-email/confirm-email.component';
import { SignupComponent } from './modules/general/signup/signup.component';
import { AuthGuard } from './_guards/auth.guard';
import { IsAdminGuard } from './_guards/is-admin.guard';
import { IsNotSignedInGuard } from './_guards/is-not-signed-in.guard';
import { IsSignedInGuard } from './_guards/is-signed-in.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsNotSignedInGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [IsNotSignedInGuard],
    children: [{ path: 'confirm-email', component: ConfirmEmailComponent }],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [IsSignedInGuard, IsAdminGuard],
  },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

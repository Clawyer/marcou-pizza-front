import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { SignInUpComponent } from './components/sign-in-up/sign-in-up.component';

const routes: Routes = [
  { path: 'account', component: SignInUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

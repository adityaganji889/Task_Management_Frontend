import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginGuard } from './login.guard';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { UserGuard } from './user.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((e) => e.AdminModule),
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((e) => e.UserModule),
    canActivate: [AuthGuard, UserGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(window.localStorage.getItem('user') || '{}');
    if (user && user.role === 'USER') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
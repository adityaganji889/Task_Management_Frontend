import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(window.localStorage.getItem('user') || '{}');
    if (user && user.role === 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
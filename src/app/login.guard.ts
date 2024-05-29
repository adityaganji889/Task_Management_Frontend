import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = window.localStorage.getItem("token");
    if (token) {
      let user:any = window.localStorage.getItem("user");
      if(user!=null){
         user = JSON.parse(user);
         if(user.role=="ADMIN"){
            this.router.navigate(['/admin/dashboard']); 
         }
         else{
            this.router.navigate(['/user/dashboard']); 
         }
      } // or '/user' based on your logic
      return false;
    } else {
      return true;
    }
  }
}
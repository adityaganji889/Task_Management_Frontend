import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemoAngularMaterailModule } from '../../../DemoAngularMaterialModule';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    DemoAngularMaterailModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  hidePassword=true;
  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router:Router){
    this.loginForm = this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(){
    console.log(this.loginForm.value)
      this.authService.login({
        email: this.loginForm.get("email")?.value,
        password: this.loginForm.get("password")?.value,
      }).subscribe((res)=>{
        console.log(res);
        if(res.success){
          this.snackBar.open(res.message,"Close",{
            duration: 5000
          })
          // this.router.navigateByUrl("/login");
          this.getUserDetails(res.token);
        }
        else{
          this.snackBar.open(res.message,"Close",{
            duration: 5000,
            panelClass: "error-snackbar"
          })
        }
      });
    }

    getUserDetails(token:string){
      this.authService.userInfo(token).subscribe((res)=>{
        if(res.success){
          this.snackBar.open(res.message,"Close",{
            duration: 5000
          })
         StorageService.saveToken(token);
         StorageService.saveUser(res.userInfo);
         if(StorageService.isAdminLoggedIn()){
           this.router.navigateByUrl("/admin/dashboard")
         } 
         else if(StorageService.isUserLoggedIn()){
          this.router.navigateByUrl("/user/dashboard")
         }

        }
      })    
    }

}

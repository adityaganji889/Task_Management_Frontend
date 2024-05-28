import { Component } from '@angular/core';
import { DemoAngularMaterailModule } from '../../../DemoAngularMaterialModule';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    DemoAngularMaterailModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  hidePassword=true;
  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router:Router){
  
    this.registerForm = this.fb.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]]
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(){
    console.log(this.registerForm.value)
    const password = this.registerForm.get("password")?.value;
    const confirmPassword = this.registerForm.get("confirmPassword")?.value;
    if(password!=confirmPassword){
      this.snackBar.open("Passwords do not match","Close",{
        duration: 5000,
        panelClass: "error-snackbar"
      })
      return;
    }
    else{
      this.authService.register({
        name: this.registerForm.get("name")?.value,
        email: this.registerForm.get("email")?.value,
        password: password,
      }).subscribe((res)=>{
        console.log(res);
        if(res.success){
          this.snackBar.open(res.message,"Close",{
            duration: 5000
          })
          this.router.navigateByUrl("/login");
        }
        else{
          this.snackBar.open(res.message,"Close",{
            duration: 5000,
            panelClass: "error-snackbar"
          })
        }
      });
    }
  }

}

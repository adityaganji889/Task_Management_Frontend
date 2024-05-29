import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { DemoAngularMaterailModule } from './DemoAngularMaterialModule';
import { StorageService } from './auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DemoAngularMaterailModule,
    RouterLink,
    RouterLinkActive,
    CommonModule
    // HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isUserLoggedIn:boolean = StorageService.isUserLoggedIn();
  isAdminLoggedIn:boolean = StorageService.isAdminLoggedIn();
  userInfo:any = StorageService.getUser();
  constructor(private router:Router, private snackBar: MatSnackBar){
  }
  ngOnInit(){
    this.router.events.subscribe(e=>{
      this.isUserLoggedIn = StorageService.isUserLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
      this.userInfo = StorageService.getUser();
    })
  }
  logout(){
    StorageService.logout();
    this.snackBar.open("Your logged out successfully","Close",{
      duration: 5000
    })
    this.router.navigateByUrl("/login");
  }
  title = 'task_management_system';
}

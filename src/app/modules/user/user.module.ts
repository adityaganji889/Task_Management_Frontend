import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DemoAngularMaterailModule } from '../../DemoAngularMaterialModule';
import { ViewTaskComponent } from './components/view-task/view-task.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ViewTaskComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterailModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ]
})
export class UserModule { }

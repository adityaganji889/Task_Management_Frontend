import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoAngularMaterailModule } from '../../DemoAngularMaterialModule';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostTaskComponent } from './components/post-task/post-task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ViewTaskComponent } from './components/view-task/view-task.component';
// import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    DashboardComponent,
    PostTaskComponent,
    UpdateTaskComponent,
    ViewTaskComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterailModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
    // MatDatepickerModule
  ]
})
export class AdminModule { }

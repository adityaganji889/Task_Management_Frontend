import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
   
  listOfTasks: any = [];
  searchForm!: FormGroup;

  constructor(private adminService: AdminService,private snackBar: MatSnackBar, private fb:FormBuilder){
    this.getAllTasks();
    this.searchForm = this.fb.group({
      title: [null]
    })
  }

  getAllTasks(){
    this.adminService.getTasks().subscribe((res)=>{
      if(res.success){
        this.listOfTasks = res.tasks;
        this.snackBar.open(res.message,"Close",{
          duration: 5000
        })
      }
      else{
        this.snackBar.open(res.message,"Close",{
          duration: 5000,
          panelClass: "error-snackbar"
        })
      }
    })
  }

  deleteTaskById(id:number){
    this.adminService.deleteTask(id).subscribe((res)=>{
      if(res.success){
        this.snackBar.open(res.message,"Close",{
          duration: 5000
        })
        this.getAllTasks();
      }
      else{
        this.snackBar.open(res.message,"Close",{
          duration: 5000,
          panelClass: "error-snackbar"
        })
      }
    })
  }

  searchTask(){
    this.listOfTasks = [];
    const title = this.searchForm.get('title')!.value;
    console.log(title);
    if(title==""){
      this.getAllTasks();
    }
    else{
      this.adminService.searchTaskByTitle(title).subscribe((res)=>{
        if(res.success){
          this.listOfTasks = res.tasks;
          this.snackBar.open(res.message,"Close",{
            duration: 5000
          })
        }
        else{
          this.snackBar.open(res.message,"Close",{
            duration: 5000,
            panelClass: "error-snackbar"
          })
        }
      })
    }
  }
}

import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrl: './post-task.component.scss'
})
export class PostTaskComponent {

  taskForm!: FormGroup;
  listOfUsers: any = [];
  listOfPriorities: any = ["LOW","HIGH","MEDIUM"];

  constructor(private adminService: AdminService,private fb: FormBuilder, private snackBar: MatSnackBar, private router:Router) { 
    this.getUsers();
    this.taskForm = this.fb.group({
      userId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]]
    })
  }

  getUsers(){
    this.adminService.getUsers().subscribe((res)=>{
      if(res.success){
        console.log(res.data);
        this.listOfUsers = res.data;
      }
    })
  }

  postTask(){
    console.log(this.taskForm.value);
    this.adminService.postTask(this.taskForm.value).subscribe((res)=>{
       if(res.success){
        this.snackBar.open(res.message,"Close",{
          duration: 5000
        })
        this.router.navigateByUrl("/admin/dashboard");
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

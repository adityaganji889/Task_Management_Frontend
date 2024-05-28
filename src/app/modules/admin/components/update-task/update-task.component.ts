import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss',
})
export class UpdateTaskComponent {
  id: number = this.route.snapshot.params['id'];
  task: any = null;
  taskUpdateForm!: FormGroup;
  listOfUsers: any = [];
  listOfPriorities: any = ['LOW', 'HIGH', 'MEDIUM'];
  listOfTaskStatus: any = [
    'PENDING',
    'INPROGRESS',
    'COMPLETED',
    'DEFERRED',
    'CANCELLED',
  ];
  taskUser: any = null;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.getTaskById();
    this.getUsers();
    this.taskUpdateForm = this.fb.group({
      userId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      // taskStatus: [null, [Validators.required]],
    });
  }

  getTaskById() {
    this.adminService.getTask(this.id).subscribe((res) => {
      if (res.success) {
        this.task = res.task;
        this.taskUser = this.task.user;
        this.taskUpdateForm.patchValue({
          userId: this.taskUser.id,
          title: this.task.title,
          description: this.task.description,
          dueDate: this.task.dueDate,
          priority: this.task.priority,
        });
        this.snackBar.open(res.message, 'Close', {
          duration: 5000,
        });
      } else {
        this.snackBar.open(res.message, 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }

  getUsers() {
    this.adminService.getUsers().subscribe((res) => {
      if (res.success) {
        this.listOfUsers = res.data;
      }
    });
  }

  editTask() {
    console.log(this.taskUpdateForm.value);
    this.adminService.updateTask(this.id,{
      title: this.taskUpdateForm.get('title')?.value,
      description: this.taskUpdateForm.get('description')?.value,
      dueDate: this.taskUpdateForm.get('dueDate')?.value,
      priority: this.taskUpdateForm.get('priority')?.value,
      userId: this.taskUpdateForm.get('userId')?.value,
      taskStatus: this.task.taskStatus
    }).subscribe((res)=>{
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

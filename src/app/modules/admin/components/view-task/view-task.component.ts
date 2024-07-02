import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss',
})
export class ViewTaskComponent {
  taskId: number = this.activatedRoute.snapshot.params['id'];
  taskData: any = {};
  commentForm!: FormGroup;
  listOfComments:any = [];

  constructor(
    private service: AdminService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getTaskById();
    this.commentForm = this.fb.group({
      content: [null, Validators.required],
    });
  }

  getTaskById() {
    this.service.getTask(this.taskId).subscribe((res) => {
      if (res.success) {
        this.snackBar.open(res.message, 'Close', {
          duration: 5000,
        });
        this.taskData = res.task;
        this.getAllComments();
      } else {
        this.snackBar.open(res.message, 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }

  publishComment() {
    this.service
      .createComment({
        userId: StorageService.getUserId,
        taskId: Number(this.taskId),
        content: this.commentForm.get('content')?.value,
      })
      .subscribe((res) => {
        if (res.success) {
          this.snackBar.open(res.message, 'Close', {
            duration: 5000,
          });
        } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar',
          });
        }
        this.commentForm = this.fb.group({
          content: [null, Validators.required],
        });
      });
  }

  getAllComments(){
    this.service.getCommentByTask(this.taskId).subscribe((res)=>{
      if(res.success){
        this.listOfComments = res.comments;
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

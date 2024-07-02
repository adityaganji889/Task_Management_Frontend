import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent {
  taskId: number = this.activatedRoute.snapshot.params['id'];
  taskData: any = {};
  commentForm!: FormGroup;
  listOfComments:any = [];

  constructor(
    private service: UserService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getTaskById();
    this.commentForm = this.fb.group({
      content: [null, Validators.required],
    });
    this.getAllComments();
  }

  getTaskById() {
    this.service.getTask(this.taskId).subscribe((res) => {
      if (res.success) {
        this.snackBar.open(res.message, 'Close', {
          duration: 5000,
        });
        this.taskData = res.task;
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
        this.getAllComments();
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

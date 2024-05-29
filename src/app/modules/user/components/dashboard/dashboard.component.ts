import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  listOfTasks: any = [];
  // searchForm!: FormGroup;

  constructor(private userService: UserService,private snackBar: MatSnackBar){
    this.getAllTasks();
    // this.searchForm = this.fb.group({
    //   title: [null]
    // })
  }

  getAllTasks(){
    this.userService.getTasks().subscribe((res)=>{
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

  updateStatus(id:number,status:string){
    this.userService.updateTaskById(id,status).subscribe((res)=>{
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

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

// const BASE_URL = "https://taskmanagementbackend-production-4883.up.railway.app";

const BASE_URL = "http://localhost:8080"

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${StorageService.getToken()}`,
      }),
    };
    return this.http.get(BASE_URL + '/api/user/getAllTasksOfUser', httpOptions);
  }

  getTask(id:number):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${StorageService.getToken()}`
      })
    };
    return this.http.get(BASE_URL+"/api/user/getTaskByUser/"+id,httpOptions);
  }

  updateTaskById(id: number, status: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${StorageService.getToken()}`,
      }),
    };
    return this.http.put(
      BASE_URL + '/api/user/updateTask',
      {
        id: id,
        status: status,
      },
      httpOptions
    );
  }

  createComment(commentDTO:any):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${StorageService.getToken()}`
      })
    };
    return this.http.post(BASE_URL+"/api/user/createNewComment",commentDTO,httpOptions);
  } 

  getCommentByTask(id:number):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${StorageService.getToken()}`
      })
    };
    return this.http.get(BASE_URL+"/api/user/getAllCommentsOfTask/"+id,httpOptions);
  }
}

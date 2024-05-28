import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = "http://localhost:8080"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${StorageService.getToken()}`
      })
    };
    return this.http.get(BASE_URL+"/api/admin/getAllUsers",httpOptions);
  }

  postTask(taskDTO:any):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${StorageService.getToken()}`
      })
    };
    return this.http.post(BASE_URL+"/api/admin/createNewTask",taskDTO,httpOptions);
  }

  getTasks():Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${StorageService.getToken()}`
      })
    };
    return this.http.get(BASE_URL+"/api/admin/getAllTasks",httpOptions);
  }

  deleteTask(id:number):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${StorageService.getToken()}`
      })
    };
    return this.http.delete(BASE_URL+"/api/admin/deleteTask/"+id,httpOptions);
  }

  getTask(id:number):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${StorageService.getToken()}`
      })
    };
    return this.http.get(BASE_URL+"/api/admin/getTask/"+id,httpOptions);
  }

  updateTask(id:number,taskDTO:any):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${StorageService.getToken()}`
      })
    };
    return this.http.put(BASE_URL+"/api/admin/updateTask/"+id,taskDTO,httpOptions);
  }
  

}

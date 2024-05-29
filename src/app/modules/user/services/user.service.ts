import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = 'http://localhost:8080';

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
}

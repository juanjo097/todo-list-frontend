import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseTasks, Task } from '../../shared/models/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserTasks(userId:string) : Observable<ResponseTasks> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<ResponseTasks>(`${this.baseUrl}/tasks`, {params})
  }

  createTasks(body : Task) : Observable<ResponseTasks> {
    return this.http.post<ResponseTasks>(`${this.baseUrl}/tasks`, body)
  }

  updateTasks(id : string,body : Task) : Observable<ResponseTasks> {
    const params = new HttpParams().set('id', id);
    return this.http.patch<ResponseTasks>(`${this.baseUrl}/tasks`, body, {params})
  }

  deleteTask(id:string) : Observable<ResponseTasks> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<ResponseTasks>(`${this.baseUrl}/tasks`,{params})
  }
}

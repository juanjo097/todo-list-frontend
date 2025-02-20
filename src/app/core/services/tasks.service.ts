import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseTasks } from '../../shared/models/tasks';


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
}

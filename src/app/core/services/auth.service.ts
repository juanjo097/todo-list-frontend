import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResponseUser, User } from '../../shared/models/user';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  // login and set the userId in the session storage
  login(email : string) : Observable<ResponseUser> {
    const params = new HttpParams().set('email', email);
    return this.http.get<ResponseUser>(`${this.baseUrl}/users`, {params}).pipe(
      tap(response => {
        if (response.data) {
          if (response.data.userId) {
            sessionStorage.setItem('userId', response.data.userId);
            sessionStorage.setItem('email', response.data.email);
          }
        }
      })
    )
  }

  createUser(body : User) : Observable<ResponseUser> {
    return this.http.post<ResponseUser>(`${this.baseUrl}/users`, body)
  }

  // cerrar session
  logout(): void {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    this.router.navigate(['/login'])
  }

  getUserIdAndEmail(): { userId: string | null, email: string | null } {
    return {
      userId: sessionStorage.getItem('userId'),
      email: sessionStorage.getItem('email')
    };
  }

}

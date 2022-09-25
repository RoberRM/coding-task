import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
}) 
export class UsersManagementService {

  private backendUrl = 'http://localhost:3000/';
  private usersUrl = this.backendUrl + 'users';
  private adminsUrl = this.backendUrl + 'admins';

  private headers = { 'content-type': 'application/json'};

  constructor(private http: HttpClient) { }

  /**
   * Set logged user;
   */
  public setUserLogged(user: any): void {
    localStorage.setItem('userLogged', JSON.stringify(user));
  }

  /**
   * Get logged user;
   */
  public getUserLogged(): User {
    return JSON.parse(localStorage.getItem('userLogged')) as User;
  }

  /**
   * Get users
   */
  public getUsers(): Observable<Object> {
    return this.http.get(this.usersUrl);
  }

  /**
   * Update user
   */
  public updateUser(user: User): Observable<Object> {
    const body = JSON.stringify(user);
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put(url, body, {'headers': this.headers});
  }

  /**
   * Add new user
   */
  public addUser(user: User): Observable<Object> {
    const body = JSON.stringify(user);
    return this.http.post(this.usersUrl, body, {'headers': this.headers});
  }

  /**
   * Delete user
   */
  public deleteUser(data: any): Observable<Object> {
    const url = `${this.usersUrl}/${data.user.id}`;
    return this.http.delete(url);
  }

  /**
   * Get admins
   */
  public getAdmins(): Observable<Object> {
    return this.http.get(this.adminsUrl);
  }
}

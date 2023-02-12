import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GreetingModel } from '../models/greeting.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private httpClient: HttpClient,private authService:AuthService) { }
  onWelcome(): Observable<GreetingModel> {
    const token: string = String(localStorage.getItem("token"));
    const headers = new HttpHeaders({
      'content-type': "application/json",
      'x-user-token': token
    });
    return this.httpClient.get<GreetingModel>("http://66.70.229.82:8181/GetGreeting", { headers: headers });
  }
  ping() {
    this.authService.checkSession();
  }
}

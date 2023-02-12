import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Router } from '@angular/router';
import { AuthResponseModel } from '../models/auth.response.model';
import { WebsocketService } from './websocket/websocket.service';
import { SocketMessage, SocketMessageType } from '../models/socketmessage.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router, private websocketService: WebsocketService) { }

  onLogin(loginModel: LoginModel):Observable<AuthResponseModel> {
    const headers = { 'content-type': 'application/json' }

    const body = {
      email: loginModel.username,
      password: loginModel.password
    };

    return this.httpClient.post<AuthResponseModel>("http://66.70.229.82:8181/Authorize", body, { headers: headers }); 
  }

  checkSession() {
    this.websocketService.checkSession();
  }

  onLogout() {
    this.websocketService.logout();     
  }


}

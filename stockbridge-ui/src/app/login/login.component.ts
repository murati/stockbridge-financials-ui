import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../models/login.model';
import { WebsocketService } from '../services/websocket/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles.css']
})
export class LoginComponent implements OnInit {
  wrongCredentials: boolean = false;
  constructor(private loginService: AuthService, private websocketService: WebsocketService, private router: Router) { }
  loginModel: LoginModel = {
    username: "",
    password: ""
  };

  ngOnInit(): void { }
  onLogin() {
    const result = this.loginService.onLogin(this.loginModel);
    result.subscribe(response => {
      if (response.status == 0) {
        localStorage.setItem("token", response.data.token);
        this.websocketService.connect(response.data.token);
        this.router.navigate(["home"]);
      }
      else
        this.wrongCredentials = true;
    })
  }
}

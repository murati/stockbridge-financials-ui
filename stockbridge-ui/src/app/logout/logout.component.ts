import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['../../styles.css']
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService) { }
  ngOnInit(): void {

  }
  onLogout() {
    this.authService.onLogout();
  }
}

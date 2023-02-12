import { Component, OnInit } from '@angular/core';
import { WelcomeService } from '../services/welcome.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../styles.css']
})
export class HomeComponent implements OnInit {
  greeting = "";
  worker: any;
  state: any;
  constructor(private welcomeService: WelcomeService) { }

  ngOnInit(): void {
    this.welcomeService.onWelcome().subscribe(response => {
      this.greeting = response.data;
    });
  }


}

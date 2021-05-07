import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WelcomeDataService, HelloWorldBean } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  Message = "Welcome Message";
  user:string;
  errorMessage:string;
  customizeMessage:string;

  //ActivatedRoute
  constructor(private route:ActivatedRoute,
    private welcomeService:WelcomeDataService,
    private router : Router) { }

  ngOnInit() {
    this.user = this.route.snapshot.params['user']
  }

  getWelcomeMessage(){
    this.welcomeService.executeWelcomeMessage().subscribe(
      response => this.handleResponse(response),
      error => this.handleError(error)
    );
  }

  gotoTodo(){
    this.router.navigate(['todo', this.user]);
  }

  getWelcomeWParaMessage(){
    this.welcomeService.executeWelcomeWParaMessage(this.user).subscribe(
      response => this.handleResponse(response),
      error => this.handleError(error)
    );
  }

  handleResponse(response){
    this.customizeMessage = response.message
  }

  handleError(error){
    this.errorMessage = error.error.message
  }
}

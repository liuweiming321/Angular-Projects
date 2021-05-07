import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "liuweiming321"
  password = ""
  errMsg = "username or password is empty"
  isBlank = false;
  

  constructor(private router : Router,
    private hardcodedAuthenticationService:HardcodedAuthenticationService) { }

  ngOnInit() {
    
  }

  handleLogin(){
    //console.log(this.username)
    if(this.hardcodedAuthenticationService.authenticate(this.username,this.password)){
      this.isBlank = false;
      this.router.navigate(['welcome', this.username]);
    }else this.isBlank = true;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username, password){
    if(username !== ''&&password !== ''){
      sessionStorage.setItem("user",username);
      return true;
    }else return false;
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem("user");
    //return true if not null which means the user is logged in
    //otherwise return false which the user is null 
    //and that means is not yet logged in
    return user !== null;
  }

  logout(){
    sessionStorage.removeItem("user");
  }
}

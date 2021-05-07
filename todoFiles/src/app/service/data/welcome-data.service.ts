import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class HelloWorldBean{
  constructor(public message:string){ }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private httpService:HttpClient
  ) { }

  executeWelcomeMessage(){
    return this.httpService.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
  }

  executeWelcomeWParaMessage(name:string){
    return this.httpService.get<HelloWorldBean>(`http://localhost:8080/hello-world/${name}`);
  }
}

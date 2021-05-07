import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Todo } from 'src/app/list-to-do/list-to-do.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private httpService:HttpClient
  ) { }

  getAllTodos(user:string){
    return this.httpService.get<Todo[]>(`http://localhost:8080/users/${user}/todos`);
  }

  deleteTodo(user:string,id:number){
    return this.httpService.delete(`http://localhost:8080/users/${user}/todos/${id}`);

  }

  retriveTodo(user:string,id:number){
    return this.httpService.get<Todo>(`http://localhost:8080/users/${user}/todos/${id}`);
  }

  updateTodo(user:string,id:number, todo){
    return this.httpService.put(`http://localhost:8080/users/${user}/todos/${id}`, todo);
  }

  addNewTodo(user:string, todo){
    return this.httpService.post(`http://localhost:8080/users/${user}/todos`, todo);
  }
}

import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public complete: boolean
  ) {

  }
}
@Component({
  selector: 'app-list-to-do',
  templateUrl: './list-to-do.component.html',
  styleUrls: ['./list-to-do.component.css']
})
export class ListToDoComponent implements OnInit {

  todos: Todo[]
  // = [
  //   new Todo(1,"learn Angular",false),
  //   new Todo(2,"learn Spring",false),
  //   new Todo(3,"get a job",false)
  // ]

  message: string
  editModal = false;
  addModal = false;
  thisId: number;
  thisDescription: string;
  thisIsFinish: boolean;
  dataToUpdate: Todo;
  user: string;
  newDescription: string = "";
  errMessage: string = null;

  constructor(
    private route: ActivatedRoute,
    private todoDataService: TodoDataService
  ) { }

  ngOnInit(): void {
    this.refreshTodos();
    this.user = this.route.snapshot.params['user'];
  }

  refreshTodos() {
    this.todoDataService.getAllTodos("liuweiming321").subscribe(
      response => {
        this.todos = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTodo(id: number) {
    this.todoDataService.deleteTodo("liuweiming321", id).subscribe(
      response => {
        console.log(response);
        this.message = "Todo Removed";
        this.refreshTodos();
      },
      error => { console.log(error) }
    );
  }

  addTodo() {
    this.addModal = true;
  }

  editTodo(todo: Todo) {
    this.editModal = true;
    this.thisId = todo.id;
    this.thisDescription = todo.description;
    this.todoDataService.retriveTodo(this.user, todo.id).subscribe(
      data => this.dataToUpdate = data
    );
  }

  updateTodo() {
    if (this.thisDescription !== "") {
      this.dataToUpdate.description = this.thisDescription;
      this.todoDataService.updateTodo(this.user, this.thisId, this.dataToUpdate)
        .subscribe(
          data => {
            this.errMessage = null;
            console.log(data);
            this.editModal = false;
            this.refreshTodos();
          },
          error => console.log(error)
        );
    }else this.errMessage = "Description can not be blank";
  }

  addNewTodo() {
    if (this.newDescription !== "") {
      this.dataToUpdate = new Todo(0, this.newDescription, false);
      this.todoDataService.addNewTodo(this.user, this.dataToUpdate)
        .subscribe(
          data => {
            this.errMessage = null;
            this.newDescription = "";
            console.log("add Success");
            this.addModal = false;
            this.refreshTodos();
          },
          error => console.log(error)
        );
    } else this.errMessage = "Description can not be blank";
  }

  closeEdit() {
    this.errMessage = null;
    this.editModal = false;
  }

  closeAdd() {
    this.newDescription = "";
    this.errMessage = null;
    this.addModal = false;
  }
}

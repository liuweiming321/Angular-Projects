package com.weiming.rest.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoHardCodedService {
	//act as database
	private static List<Todo> todos = new ArrayList<>();
	private static int idGenerate = 0;
	
	static {
		todos.add(new Todo(++idGenerate,"liuweiming321","learn Spring",false));
		todos.add(new Todo(++idGenerate,"liuweiming321","learn Angular",false));
		todos.add(new Todo(++idGenerate,"liuweiming321","GET A JOB",false));
	}
	
	public List<Todo> getAllTodos(){
		return todos;
	}
	
	public Todo saveTodo(Todo todo) {
		if(todo.getId()==-1 || todo.getId()==0) {
			todo.setId(++idGenerate);
			todos.add(todo);
		}else {
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}
	
	public static int getId() {
		return idGenerate;
	}

	public static void setId(int idGenerate) {
		TodoHardCodedService.idGenerate = idGenerate;
	}

	public Todo deleteById(long id) {
		Todo todo = findId(id);
		if(todo != null)
			todos.remove(todo);
		return todo;
	}

	private Todo findId(long id) {
		for(Todo todo:todos) {
			if(todo.getId() == id)
				return todo;
		}
		return null;
	}
	
	public Todo getTodoById(long id) {
		return findId(id);
	}
	
}

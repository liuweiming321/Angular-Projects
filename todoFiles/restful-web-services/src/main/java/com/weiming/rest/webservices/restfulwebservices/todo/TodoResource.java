package com.weiming.rest.webservices.restfulwebservices.todo;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class TodoResource {

	@Autowired
	private TodoHardCodedService todoService;
	
	@GetMapping(path="users/{user}/todos")
	public List<Todo> getAllTodos(@PathVariable String user){
		return todoService.getAllTodos();
	}
	
	@GetMapping(path="users/{user}/todos/{id}")
	public Todo getOneTodo(@PathVariable String user, @PathVariable long id) {
		return todoService.getTodoById(id);
	}
	
	@DeleteMapping(path="users/{user}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(
			@PathVariable String user,@PathVariable long id) {
		
		Todo todo = todoService.deleteById(id);
		if(todo == null)
			return ResponseEntity.notFound().build();
		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(path="users/{user}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(
			@PathVariable String user,@PathVariable long id, @RequestBody Todo todo){
		Todo todoResponse = todoService.saveTodo(todo);
		
		return new ResponseEntity<Todo>(todoResponse, HttpStatus.OK);
	}
	
	@PostMapping(path="users/{user}/todos")
	public ResponseEntity<Void> addTodo(
			@PathVariable String user, @RequestBody Todo todo){
		todo.setUser(user);
		Todo newTodo = todoService.saveTodo(todo);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
			.path("/{id}").buildAndExpand(newTodo.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
}

package com.weiming.rest.webservices.restfulwebservices.helloworld;

public class HelloWorldBean {
	private String message;
	
	HelloWorldBean(String message){
		this.setMessage(message);
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	@Override
	public String toString() {
		return "Hello World Bean:"+message;
	}
}

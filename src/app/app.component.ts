import { Component } from '@angular/core';

// declare var require: any;
import {Md5} from "md5-typescript"

interface Todo {
  id: string,
  todo: string,
  isDone: boolean,
  createdAt: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  todoInput: string;
  todos: Todo[];
  
  constructor(){
    //
    if(!localStorage.getItem('todos')){
      localStorage.setItem('todos', JSON.stringify([]));
    }
  }
  
  ngOnInit(){
    this.todoInput = '';
    // Get todos from local storage.

    this.todos = JSON.parse(localStorage.getItem('todos'));
    // alert(this.todos.length)
  }
  
  addTodo() {
    
    this.todos.push({
      id: Md5.init(Date.now()),
      todo: this.todoInput,
      isDone: false,
      createdAt: Date.now()
    });
    
    // Save todo to the local storage
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.todoInput = '';
    
  }


}

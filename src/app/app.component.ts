import { Component } from '@angular/core';

// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

// declare var require: any;
import {Md5} from "md5-typescript"

interface Todo {
  id: string,
  todo: string,
  isDone: boolean,
  createdAt: number,
  onEdit: boolean;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // Fontawesome
  // faCoffee = faCoffee;

  todoInput: string;
  todos: Todo[];
  EditTodoInput: string;
  
  
  constructor(){
    // Check if local storage is empty, if empty fill it with empty array
    if(!localStorage.getItem('todos')){
      localStorage.setItem('todos', JSON.stringify([]));
    }
  }
  
  ngOnInit(){
    this.todoInput = '';
    this.EditTodoInput = '';
    // Get todos from local storage.
    this.todos = JSON.parse(localStorage.getItem('todos'));

    // alert(this.todos.length)
  }
  
  addTodo() {
    
    this.todos.push({
      id: Md5.init(Date.now()),
      todo: this.todoInput,
      isDone: false,
      createdAt: Date.now(),
      onEdit: false
    });
    
    // Save todo to the local storage
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.todoInput = '';
    
  }

  deleteTodo(todo){
    // this.todos.splice()
    this.todos.splice(this.todos.indexOf(todo), 1);
    // Update local storage
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  onEditTodo(todo){
    // console.log(todo);
    // console.log(this.todos.indexOf(todo));

    // chenge onEdit property of element to true to show the input and hide the text of current todo
    this.todos[this.todos.indexOf(todo)].onEdit = true;

    // Inisial the input with the current todo value
    this.EditTodoInput = todo.todo;
  }

  editTodo(todo){
    this.todos[this.todos.indexOf(todo)].todo = this.EditTodoInput;
    this.todos[this.todos.indexOf(todo)].onEdit = false;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

}

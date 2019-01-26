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
  tasksToShow: boolean;
  filterTodos: string;
  isOnEdit: boolean;

  
  
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
    
    this.isOnEdit = false;

    this.tasksToShow = false;
    this.filterTodos = 'all';
  }
  
  addTodo() {

    if (this.todoInput.length === 0) return;
    
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
    
    if(this.isOnEdit) return;
    this.isOnEdit = true;

    // chenge onEdit property of element to true to show the input and hide the text of the current todo
    this.todos[this.todos.indexOf(todo)].onEdit = true;

    // Inisial the input with the current todo value
    this.EditTodoInput = todo.todo;
  }

  editTodo(todo){
    if (this.EditTodoInput.length === 0) {
      this.todos[this.todos.indexOf(todo)].onEdit = false;
      this.isOnEdit = false;
      return;
    }
    let todoItem = this.todos[this.todos.indexOf(todo)];
    
    todoItem.todo = this.EditTodoInput;
    todoItem.onEdit = false;
    this.isOnEdit = false;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  cancelEdit(todo){
    this.EditTodoInput = '';
    this.todos[this.todos.indexOf(todo)].onEdit = false;
    this.isOnEdit = false;

    console.log('called');
  }

  doneTodo(todo){
    this.todos[this.todos.indexOf(todo)].isDone = !this.todos[this.todos.indexOf(todo)].isDone;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  filtringTodos(){
    // this.todos.filter(todo => !todo.isDone);
    if (this.filterTodos === 'all') return this.todos;
    if (this.filterTodos === 'uncompleted') return this.todos.filter(todo => !todo.isDone);
    if (this.filterTodos === 'completed') return this.todos.filter(todo => todo.isDone);
  }

  tasksRemaiming(){
    let remaining = this.todos.filter(todo => !todo.isDone).length;
    
    if (remaining === 0) {
      return 'All done';
    } else if (remaining === 1) {
      return 'One task left';
    } else {
      return `${remaining} tasks left`;
    }

    return this.todos.filter(todo => !todo.isDone).length;
  }
  
}

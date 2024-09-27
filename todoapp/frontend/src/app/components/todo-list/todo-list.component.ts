  import { Component, OnInit } from '@angular/core';
  import { Todo  } from 'src/app/models/todo.model';
  import { TodoService } from 'src/app/services/todo.service';

  @Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
  })
  export class TodoListComponent implements OnInit {
    todos: Todo[] = [];
    currentTodo: Todo ={};
    currentIndex = -1;
    title = '';
    constructor(private todoService: TodoService) { }
    ngOnInit(): void {
        this.retriveTodos();
    }
    retriveTodos(){
      this.todoService.getAll()
      .subscribe({
        next: (data) =>{
          this.todos= data;
          console.log(data);
        },
        error: (e) => console.error(e)
      })
    }
    refreshList(): void {
      this.retriveTodos();
      this.currentTodo = {};
      this.currentIndex= -1;
    }
    setActiveTodo(todo: Todo, index: number): void {
      this.currentTodo = todo;
      this.currentIndex = index;
    }
    removeAlltodos(): void {
      this.todoService.deleteAll()
      .subscribe({
        next:(res) =>{
          console.log(res);
          this.refreshList();
        }
      })
    }  
    searchTitle(): void{
      this.currentTodo={};
      this.currentIndex=-1;
      this.todoService.findByTitle(this.title)
      .subscribe({
        next:(data) =>{
          this.todos=data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }


  }

import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  todo: Todo ={
    title: '',
    description: '',
    completed: false
   };
   submitted = false;
   constructor (private TodoService : TodoService) {}
   ngOnInit(): void {
  
   }
   saveTodo (){
    console.log("i am here")
    const data ={
      title: this.todo.title,
      description: this.todo.description
    };
    this.TodoService.create(data)
    .subscribe ({
      next: (res) =>{
        console.log(res);
        this.submitted = true;
      },
      error:(e) => console.error(e)
    });
   }
   newTodo():void {
    this.submitted = false;
    this.todo ={
      title: '',
      description: '',
      completed: false
    };
   }
  
}

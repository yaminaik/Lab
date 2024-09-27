import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'todo', pathMatch:'full'},
  {path: 'todo', component:TodoListComponent},
  {path: 'todo/:id', component:TodoDetailsComponent},
  {path: 'add', component: TodoAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

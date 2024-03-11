import { Routes } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './add-task/add-task.component';

export const routes: Routes = [
	{path: '', component: TasksListComponent},
	{path: 'task/:id', component: TaskComponent},
	{path: 'add', component: AddTaskComponent}
];

import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatCardAvatar } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule,RouterModule,MatButtonModule,MatCardModule,MatCardAvatar,MatGridListModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent implements OnInit{
  constructor(private tasksService: TaskService) {}
  tasks$?:Observable<Task[]>

  ngOnInit(): void {
    this.tasks$ = this.tasksService.getTasks();
  }
  
}

import { Injectable } from "@angular/core";
import { Employee } from "./employees.service";
import { Observable, filter, first, map, of, take, tap } from "rxjs";

export type Priority = "high" | "medium" | "low";
export type Status = "completed" | "doing" | "toDo" | "upcoming";

export interface Task {
	task_id: string;
	title: string;
	name: string;
	deadline: string;
	priority: Priority;
	status: Status;
	employees: Employee[];
}

@Injectable({
	providedIn: "root",
})
export class TaskService {
	constructor() {
		this.initTasks();
		this._tasks$ = of(JSON.parse(localStorage.getItem("tasks") ?? ""));
	}
	private _tasks$?: Observable<Task[]>;

	getTasks() {
		return this._tasks$;
	}

	initTasks() {
		if (!localStorage.getItem("tasks")) {
			localStorage.setItem("tasks", JSON.stringify([]));
		}
	}

	addTask(task: Task) {
		let tasks = JSON.parse(localStorage.getItem("tasks") ?? "");
		tasks.push(task);
		this._tasks$?.subscribe({
			next: (value) => {
				value.push(task);
			},
		});
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}
	editTask(task: Task) {
		let tasks = JSON.parse(localStorage.getItem("tasks") ?? "");
		const {task_id} = task

		let index = tasks.findIndex((itemTask:Task) => itemTask.task_id === task_id)
		tasks[index] = task;

		this._tasks$?.subscribe({
			next: (value) => {
				value[index] = task;
			},
		});
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}


	getTaskById(taskId: string) {
		return this._tasks$
			?.pipe(
				map((tasks) => tasks.filter((iterableTask) => iterableTask.task_id == taskId)),
			)
	}
}

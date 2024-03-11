import { Injectable } from "@angular/core";
import { Employee } from "./employees.service";

export type Priority = "high" | "medium" | "low";
export type Status = "completed" | "doing" | "toDo" | "upcoming";


export interface Task {
	task_id: number;
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
	constructor() {}

	public addTask(task: Task) {
		if (!localStorage.getItem('tasks')) {
			localStorage.setItem('tasks', JSON.stringify([]))
		}
		let tasks = JSON.parse(localStorage.getItem("tasks") ?? "");
		tasks.push(task);
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}
}

import { Component, Input } from "@angular/core";
import { TaskService } from "../task.service";
import { Task } from "./../task.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-task",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./task.component.html",
	styleUrl: "./task.component.scss",
})
export class TaskComponent {
	@Input() public taskId?: string;
	// task$: Observable<Task[]>;

	constructor(private taskService: TaskService) {
    console.log(this.taskId);
		//   console.log('taskId', this.taskId)
		//     this.task$ = this.taskService.getTaskById(this.taskId!)!;
		// }
	}
}

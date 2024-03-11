import { Component, OnInit } from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
	FormBuilder,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { TaskService } from "../task.service";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { Employee, EmployeesService } from "../employees.service";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-add-task",
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatSelectModule,
		MatButtonModule,
		MatCheckboxModule,
		CommonModule,
	],
	providers: [provideNativeDateAdapter()],
	templateUrl: "./add-task.component.html",
	styleUrl: "./add-task.component.scss",
})
export class AddTaskComponent {
	employees: Employee[] = this.emloyeeService.getEmployees();

	constructor(
		private taskService: TaskService,
		private emloyeeService: EmployeesService,
		private _formBuilder: FormBuilder
	) {}

	public taskForm = new FormGroup({
		title: new FormControl("", [Validators.required]),
		name: new FormControl("", [Validators.required]),
		deadline: new FormControl("", [Validators.required]),
		priority: new FormControl("", [Validators.required]),
		status: new FormControl("", [Validators.required]),
	});
	employeesForm = this._formBuilder.group(this.transformEmployees());

	async addForm() {
		console.log(this.employeesForm.value);

		this.taskService.addTask({
			task_id: Math.floor(Math.random() * 10000),
			title: this.taskForm.value.title ?? "",
			name: this.taskForm.value.name ?? "",
			deadline: new Date(this.taskForm.value.deadline ?? "").toISOString(),
			priority: "high",
			status: "upcoming",
			employees: this.filterEmployeesForm(),
		});
	}

	private transformEmployees() {
		const obj: {
			[index: string]: boolean;
		} = {};
		this.employees.forEach((employee) => {
			obj[employee.name] = false;
		});
		return obj;
	}
	private filterEmployeesForm() {
		const { value: employeesObj } = this.employeesForm;
		const keys = Object.keys(employeesObj);
		const resultArr: Employee[] = [];
		keys.forEach((prop) => {
			if (employeesObj[prop]) {
				resultArr.push({ name: prop });
			}
		});
		return resultArr;
	}
}

import { Component, Input } from "@angular/core";
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
import { Priority, Status, Task, TaskService } from "../task.service";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { Employee, EmployeesService } from "../employees.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

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
	@Input() public taskId?: string;
	public isEdit: boolean = false;
	public currentTask?: Task;

	private sub = this.router.events.subscribe((event) => {
		if (this.isEdit) {
			this.taskService
				.getTaskById(this.taskId!)
				?.subscribe((sub) => {
					this.taskForm.patchValue({
						title: sub[0].title,
						name: sub[0].name,
						deadline: sub[0].deadline,
						priority: sub[0].priority,
						status: sub[0].status,
					});
					let patchObject = this.transformEmployees(sub[0].employees);
					this.employeesForm.patchValue(patchObject);
				})
				.unsubscribe();
		}
		if (this.taskId) {
			this.isEdit = true;
		} else {
			this.isEdit = false;
		}
	});

	constructor(
		private taskService: TaskService,
		private emloyeeService: EmployeesService,
		private _formBuilder: FormBuilder,
		private router: Router
	) {
		this.taskService.getTaskById(this.taskId ?? "8102");
	}

	public taskForm = this._formBuilder.group({
		title: ["", [Validators.required]],
		name: ["", [Validators.required]],
		deadline: ["", [Validators.required]],
		priority: ["low" as Priority, [Validators.required]],
		status: ["upcoming" as Status, [Validators.required]],
	});

	employeesForm = this._formBuilder.group(this.transformEmployees());

	addForm() {
		this.taskService.addTask({
			task_id: Math.floor(Math.random() * 10000).toString(),
			title: this.taskForm.value.title ?? "",
			name: this.taskForm.value.name ?? "",
			deadline: new Date(this.taskForm.value.deadline ?? "").toISOString(),
			priority: this.taskForm.value.priority ?? "low",
			status: this.taskForm.value.status ?? "upcoming",
			employees: this.filterEmployeesForm(),
		});
		this.router.navigate(["/"]);
	}
	editForm() {
		if (!this.taskId) return;
		
		this.taskService.editTask({
			task_id: this.taskId,
			title: this.taskForm.value.title ?? "",
			name: this.taskForm.value.name ?? "",
			deadline: new Date(this.taskForm.value.deadline ?? "").toISOString(),
			priority: this.taskForm.value.priority ?? "low",
			status: this.taskForm.value.status ?? "upcoming",
			employees: this.filterEmployeesForm(),
		});
		this.router.navigate(["/"]);
	}

	private transformEmployees(employeesArr?: Employee[]) {
		const obj: {
			[index: string]: boolean;
		} = {};

		if (employeesArr) {
			this.employees.forEach((employee) => {
				obj[employee.name] = false;
				employeesArr.forEach((employeeA) => {
					if (employee.name === employeeA.name) {
						obj[employee.name] = true;
						return
					}
				});
			});
		} else {
			this.employees.forEach((employee) => {
				obj[employee.name] = false;
			});
		}
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

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}

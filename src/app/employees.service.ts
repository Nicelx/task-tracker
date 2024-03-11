import { Injectable } from '@angular/core';

export interface Employee {
	name: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private _initialEmployees:Employee[] = [
    {name: 'John Grames'},
    {name: 'Rick Davis'},
    {name: 'Max Garcia'}
  ]


  constructor() { 
    localStorage.setItem('employees', JSON.stringify(this._initialEmployees))
  }
  public getEmployees() {
    if (!localStorage.getItem('employees')) {
			return []
		}
		let employees = JSON.parse(localStorage.getItem("employees") ?? '');
		return employees;
  }

}

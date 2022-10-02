import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Employee { id: number, title: string, name: string, reportsTo: number | null };

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // Create an array of objects called employee with the following properties
  // id, title, name, reportsTo
  // The id should be a number
  // The title should be a string
  // The name should be a string
  // The reportsTo should be a number
  employee: Employee[] = [
    { id: 1, title: 'Manager', name: 'John Smith', reportsTo: null },
    { id: 2, title: 'Manager', name: 'Jane Doe', reportsTo: 1 },
    { id: 3, title: 'Manager', name: 'John Doe', reportsTo: 2 },
    { id: 4, title: 'Employee', name: 'Jane Smith', reportsTo: 3 },
    { id: 5, title: 'Employee', name: 'Joe Smith', reportsTo: 3 },
    { id: 6, title: 'Employee', name: 'Joe Doe', reportsTo: 3 },
    { id: 7, title: 'Manager', name: 'Jane Doe', reportsTo: 3 },
    { id: 8, title: 'Employee', name: 'John Smith', reportsTo: 7 },
    { id: 9, title: 'Employee', name: 'Jane Smith', reportsTo: 7 },
    { id: 10, title: 'Employee', name: 'Joe Smith', reportsTo: 7 },
    { id: 11, title: 'Employee', name: 'Joe Doe', reportsTo: 7 },
    { id: 12, title: 'Manager', name: 'John Doe', reportsTo: 2 },
    { id: 13, title: 'Employee', name: 'Jane Smith', reportsTo: 12 },
    { id: 14, title: 'Employee', name: 'Joe Smith', reportsTo: 12 },
    { id: 15, title: 'Employee', name: 'Joe Doe', reportsTo: 12 },
    { id: 16, title: 'Manager', name: 'Jane Doe', reportsTo: 2 },
    { id: 17, title: 'Employee', name: 'John Smith', reportsTo: 16 },
  ];


  // Create a function called getEmployees that returns the employee array
  // and returns an observable of the employee array using the of operator
  getEmployees() {
    return of(this.employee);
  }

  // Create a function called getEmployeeById that takes an id as a parameter
  // and returns observable of the employee object with the matching id
  getEmployeeById(id: number) {
    return of(this.employee.find(employee => employee.id === id));
  }

  // Create a function called getEmployeesByManagerId that takes an id as a parameter
  // and returns an array of employee objects that have the matching id as their reportsTo property
  getEmployeesByManagerId(id: number) {
    return of(this.employee.filter(e => e.reportsTo === id));
  }

  // Create a function called getManagers that returns an array of employee objects
  // that have a title of 'Manager'
  getManagers() {
    return of(this.employee.filter(e => e.title === 'Manager'));
  }

  // Create a function called getEmployeesByTitle that takes a title as a parameter
  // and returns an array of employee objects that have the matching title
  getEmployeesByTitle(title: string) {
    return of(this.employee.filter(e => e.title === title));
  }

  // Create a function called getEmployeesWithoutManagers that returns an array of employee objects
  // that have a null value for their reportsTo property
  getEmployeesWithoutManagers() {
    return of(this.employee.filter(e => e.reportsTo === null));
  }

  // Create a function called createEmployee that takes an employee object as a parameter
  // and adds the employee object to the employee array
  createEmployee(employee: Employee) {
    this.employee.push(employee);
  }

  // Create a function called updateEmployee that takes an employee object as a parameter
  // and updates the employee object in the employee array with the matching id
  updateEmployee(employee: Employee) {
    const index = this.employee.findIndex(e => e.id === employee.id);
    this.employee[index] = employee;
  }

  // Create a function called deleteEmployee that takes an id as a parameter
  // and deletes the employee object from the employee array with the matching id
  deleteEmployee(id: number) {
    this.employee = this.employee.filter(e => e.id !== id);
  }

  // create a function called aggregateEmployeesByManager that returns an array of objects
  // with the following properties
  // id, name, title, reportsTo, employees
  // The id should be a number
  // The name should be a string
  // The title should be a string
  // The reportsTo should be a number
  // The employees should be an array of employee objects
  aggregateEmployeesByManager() {
    return of(this.employee.filter(e => e.reportsTo === null).map(e => {
      return {
        id: e.id,
        name: e.name,
        title: e.title,
        reportsTo: e.reportsTo,
        employees: this.employee.filter(e2 => e2.reportsTo === e.id)
      }
    }));
  }
}

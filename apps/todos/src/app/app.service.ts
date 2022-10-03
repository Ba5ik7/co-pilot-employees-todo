import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Create interface for employee data
export interface Employee { id: number, title: string, name: string, reportsTo: number | null, employees?: Employee[], employeeProfile?: EmployeeProfile };

// Create interface for employeeProfile data
export interface EmployeeProfile { id: number, employeeId: number, firstName: string, lastName: string, email: string, phone: string, address: string, city: string, state: string, zip: string };

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
  employees: Employee[] = [
    { id: 1, title: 'Manager', name: 'John Smith', reportsTo: null },
    { id: 2, title: 'Manager', name: 'Jane Doe', reportsTo: 1 },
    { id: 3, title: 'Manager', name: 'John Doe', reportsTo: 2 },
    { id: 4, title: 'Employee', name: 'Jane Smith', reportsTo: 2 },
    { id: 5, title: 'Employee', name: 'Joe Smith', reportsTo: 2 },
    { id: 6, title: 'Employee', name: 'Joe Doe', reportsTo: 3 },
    { id: 7, title: 'Manager', name: 'Jane Doe', reportsTo: 2 },
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

  // Create Array of objects called employeeProfile with the following properties
  // id, employeeId, firstName, lastName, email, phone, address, city, state, zip
  // The id should be a number
  // The employeeId should be a number
  // The firstName should be a string
  // The lastName should be a string
  // The email should be a string
  // The phone should be a string
  // The address should be a string
  // The city should be a string
  // The state should be a string
  // The zip should be a string
  employeeProfiles: EmployeeProfile[] = [
    { id: 1, employeeId: 1, firstName: 'John', lastName: 'Smith', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 2, employeeId: 2, firstName: 'Jane', lastName: 'Doe', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 3, employeeId: 3, firstName: 'John', lastName: 'Doe', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 4, employeeId: 4, firstName: 'Jane', lastName: 'Smith', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 5, employeeId: 5, firstName: 'Joe', lastName: 'Smith', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 6, employeeId: 6, firstName: 'Joe', lastName: 'Doe', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 7, employeeId: 7, firstName: 'Jane', lastName: 'Doe', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 8, employeeId: 8, firstName: 'John', lastName: 'Smith', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 9, employeeId: 9, firstName: 'Jane', lastName: 'Smith', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 10, employeeId: 10, firstName: 'Joe', lastName: 'Smith', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 11, employeeId: 11, firstName: 'Joe', lastName: 'Doe', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 12, employeeId: 12, firstName: 'John', lastName: 'Doe', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 13, employeeId: 13, firstName: 'Jane', lastName: 'Smith', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 14, employeeId: 14, firstName: 'Joe', lastName: 'Smith', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 15, employeeId: 15, firstName: 'Joe', lastName: 'Doe', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 16, employeeId: 16, firstName: 'Jane', lastName: 'Doe', email: '', phone: '', address: '', city: '', state: '', zip: '' },
    { id: 17, employeeId: 17, firstName: 'John', lastName: 'Smith', email: '', phone: '', address: '', city: '', state: '', zip: '' },
  ];


  // Create a function called getEmployees that returns the employee array
  // and returns an observable of the employee array using the of operator
  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  // Create a function called getEmployees that returns the employee array
  // and returns an observable of the employee array using the of operator
  getEmployeeProfiles(): Observable<EmployeeProfile[]> {
    return of(this.employeeProfiles);
  }

  // create a function called getEmployeeProfile that that takes an id as a parameter
  // and gets EmployeeProfile
  // getCrewProfile
  getEmployeeProfileById(id: number): Observable<EmployeeProfile> {
    return of(this.employeeProfiles.find(e => e.employeeId === id) ?? {} as EmployeeProfile);
  }

  // Create a function called getEmployeeById that takes an id as a parameter
  // and returns observable of the employee object with the matching id
  getEmployeeById(id: number): Observable<Employee> {
    return of(this.employees.find(employee => employee.id === id) ?? {} as Employee);
  }

  // Create a function called getEmployeesByManagerId that takes an id as a parameter
  // and returns an array of employee objects that have the matching id as their reportsTo property
  // getListofDirectReports
  getEmployeesByManagerId(id: number): Observable<Employee[]> {
    return of(this.employees.filter(e => e.reportsTo === id));
  }

  // Create a function called getManagers that returns an array of employee objects
  // that have a title of 'Manager'
  getManagers(): Observable<Employee[]> {
    return of(this.employees.filter(e => e.title === 'Manager'));
  }

  // Create a function called getEmployeesByTitle that takes a title as a parameter
  // and returns an array of employee objects that have the matching title
  getEmployeesByTitle(title: string): Observable<Employee[]> {
    return of(this.employees.filter(e => e.title === title));
  }

  // Create a function called getEmployeesWithoutManagers that returns an array of employee objects
  // that have a null value for their reportsTo property
  getEmployeesWithoutManagers(): Observable<Employee[]> {
    return of(this.employees.filter(e => e.reportsTo === null));
  }

  // Create a function called createEmployee that takes an employee object as a parameter
  // and adds the employee object to the employee array
  createEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  // Create a function called updateEmployee that takes an employee object as a parameter
  // and updates the employee object in the employee array with the matching id
  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex(e => e.id === employee.id);
    this.employees[index] = employee;
  }

  // Create a function called deleteEmployee that takes an id as a parameter
  // and deletes the employee object from the employee array with the matching id
  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(e => e.id !== id);
  }

  // create a function called aggregateEmployeesByManager that returns an array of objects
  // with the following properties
  // id, name, title, reportsTo, employees
  // The id should be a number
  // The name should be a string
  // The title should be a string
  // The reportsTo should be a number
  // The employees should be an array of employee objects
  aggregateEmployeesByManager(): Observable<Employee[]> {
    return of(this.employees.filter(e => e.reportsTo === null).map(e => {
      return {
        id: e.id,
        name: e.name,
        title: e.title,
        reportsTo: e.reportsTo,
        employees: this.employees.filter(e2 => e2.reportsTo === e.id)
      }
    }));
  }
}

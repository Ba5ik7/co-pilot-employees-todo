import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { AppService, Employee } from './app.service';

@Component({
  selector: 'tmdjr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todos';

  employee!: Employee[];
  managers!: Employee[];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getEmployees().subscribe((employees) => {
      console.log({ getEployees: employees });
      this.employee = employees;
    });

    this.appService.getEmployeeById(1).subscribe((employee) => {
      console.log({ getEmployeeById: employee });
    });

    this.appService.getEmployeesByManagerId(2).subscribe((employees) => {
      console.log({ getEmployeesByManagerId: employees });
    });

    this.appService.getManagers().subscribe((managers) => {
      console.log({ getManagers: managers });
      this.managers = managers;
    });
    
    // aggregate the employees by manager
    this.appService.getManagers().subscribe((managers) => {
      managers.forEach((manager) => {
        this.appService.getEmployeesByManagerId(manager.id).subscribe((employees) => {
          console.log({ manager: manager.name, employees: employees });
        });
      });
    });

    this.getManagerAggregateData().subscribe((data) => {
      console.log({ managerAggregateData: data });
    });
  }
  
  // Create a function that returns aggregate data for each manager as an Observable
  // The aggregate data should include the manager's name and the number of employees they manage
  // The aggregate data should be returned as an array of objects
  // The array of objects should have the following properties
  // manager, employeeCount
  // The manager property should be a string
  // The employeeCount property should be a number
  getManagerAggregateData() {
    return of(this.managers.map(manager => {
      return {
        manager: manager.name,
        employeeCount: this.appService.getEmployeesByManagerId(manager.id).subscribe((employees) => {
          return employees.length;
        })                                                                                                                                                                                                                      
      }
    }));
  }
}

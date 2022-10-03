import { Component, OnInit } from '@angular/core';
import { expand, flatMap, forkJoin, iif, map, merge, mergeMap, Observable, of, partition, switchMap, tap, toArray } from 'rxjs';
import { AppService, Employee, EmployeeProfile } from './app.service';

@Component({
  selector: 'tmdjr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todos';

  // employee!: Employee[];
  // managers!: Employee[];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.getRecursive(12).subscribe(console.log);
    // this.appService.getEmployees().subscribe((employees) => {
    //   console.log({ getEployees: employees });
    //   this.employee = employees;
    // });

    // this.appService.getEmployeeById(1).subscribe((employee) => {
    //   console.log({ getEmployeeById: employee });
    // });

    // this.appService.getEmployeesByManagerId(2).subscribe((employees) => {
    //   console.log({ getEmployeesByManagerId: employees });
    // });

    // this.appService.getManagers().subscribe((managers) => {
    //   console.log({ getManagers: managers });
    //   this.managers = managers;
    // });
    
    // // aggregate the employees by manager
    // this.appService.getManagers().subscribe((managers) => {
    //   managers.forEach((manager) => {
    //     this.appService.getEmployeesByManagerId(manager.id).subscribe((employees) => {
    //       console.log({ manager: manager.name, employees: employees });
    //     });
    //   });
    // });

    // this.getManagerAggregateData().subscribe((data) => {
    //   console.log({ managerAggregateData: data });
    // });
    // this.getEmployeeProfileAggregateData().subscribe((data) => {
    //   console.log({ employeeProfileAggregateData: data });
    // });
  }

  getRecursive(employeeId: number): Observable<unknown> {
    return this.appService.getEmployeeById(employeeId)
    .pipe(
      mergeMap(employee => this.appService.getEmployeesByManagerId(employee?.id ?? 1)),
      switchMap(employees =>
        forkJoin(
          employees.map(employee => {
            return iif(() => employee?.title === 'Manager',
            this.getRecursive(employee?.id ?? 1), 
            of(employee))
          })
        )
      ),
      toArray()
    );
  }
  
  // Create a function that returns aggregate data for each manager as an Observable
  // The aggregate data should include the manager's name and the number of employees they manage
  // The aggregate data should be returned as an array of objects
  // The array of objects should have the following properties
  // manager, employeeCount
  // The manager property should be a string
  // The employeeCount property should be a number
  // getManagerAggregateData() {
  //   return of(this.appService.getManagers()
  //   .pipe(
  //     map(manager => {
  //       return {
  //         manager: manager.name,
  //         employeeCount: this.appService.getEmployeesByManagerId(manager.id).subscribe((employees) => {
  //           return employees.length;
  //         })                                                                                                                                                                                                                      
  //       }
  //     }))
  //   )
  // }

  // Create a function that returns aggregate data for each EmployeeProfile under a manager as an Observable
  // The aggregate data should include the manager's id and an array employees profiles they manage
  // The aggregate data should be returned as an array of objects
  // The array of objects should have the following properties
  // managerId, employeeProfiles
  // The managerId property should be a number
  // The employeeProfiles property should be an array of EmployeeProfile objects
  // getEmployeeProfileAggregateData() {
  //   return of(this.managers.map(manager => {
  //     return {
  //       managerId: manager.id,
  //       employeeProfiles: this.appService.getEmployeesByManagerId(manager.id).subscribe((employees) => {
  //         return employees.map(employee => {
  //           return this.appService.getEmployeeProfileById(employee.id).subscribe((employeeProfile) => {
  //             return employeeProfile;
  //           });
  //         });
  //       })
  //     }
  //   }));
  // }
}

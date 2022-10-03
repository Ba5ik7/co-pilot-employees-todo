import { Component, OnInit } from '@angular/core';
import { combineLatest, concatMap, expand, forkJoin, map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { AppService, Employee } from './app.service';

@Component({
  selector: 'tmdjr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Employee Hierarchy';
  dataJson$!: Observable<Employee>;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.dataJson$ = this.getEmployeeHierarchyRecursive(1);

    // aggregate the employees by manager
    // this.appService.getManagers().subscribe((managers) => {
    //   managers.forEach((manager) => {
    //     this.appService.getEmployeesByManagerId(manager.id).subscribe((employees) => {
    //       console.log({ manager: manager.name, employees: employees });
    //     });
    //   });
    // });
  }

  // https://indepth.dev/posts/1114/learn-to-combine-rxjs-sequences-with-super-intuitive-interactive-diagrams
  getEmployeeHierarchyRecursive(employeeId: number): Observable<Employee> {
    return this.appService.getEmployeeById(employeeId)
    .pipe(
      // Merge stream of employee with stream of employee's profiles, and their direct reports
      // https://indepth.dev/posts/1114/learn-to-combine-rxjs-sequences-with-super-intuitive-interactive-diagrams#concatall
      concatMap(employee => (
        // Combine all these streams into a single stream of objects
        // https://indepth.dev/posts/1114/learn-to-combine-rxjs-sequences-with-super-intuitive-interactive-diagrams#combinelatest
        combineLatest({
          employee: of(employee),
          employeeProfile: this.appService.getEmployeeProfileById(employee.id),
          employees: this.appService.getEmployeesByManagerId(employee.id)
        })
      )),

      // Merge stream of employee with stream of employee's profiles, and their direct reports
      // https://indepth.dev/posts/1114/learn-to-combine-rxjs-sequences-with-super-intuitive-interactive-diagrams#mergeall
      mergeMap(({ employee, employeeProfile, employees }) =>
        // Persist the stream of employee in the `employee` property
        // Persist the stream of employeeProfile in the `employeeProfile` property
        // Recursively get employee hierarchy
        // Keep expanding the stream of employees until there are no more direct reports
        // https://indepth.dev/posts/1114/learn-to-combine-rxjs-sequences-with-super-intuitive-interactive-diagrams#forkjoin
        forkJoin([
          of(employee),
          of(employeeProfile),
          ...employees.map(employee => this.getEmployeeHierarchyRecursive(employee.id))
        ])
      ),
      
      // Set the direct reports of the employee's `employees` property
      // Set the employee's employeeProfile of the employee's `employeeProfile` property
      tap(([employee, employeeProfile, ...employees]) => {
        employee.employees = employees;
        employee.employeeProfile = employeeProfile;
      }),

      // Map everything back down to the employee
      map(([employee]) => employee)
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

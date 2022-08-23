import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue! : FormGroup;
  emloyeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData! : any;
  showAdd!: boolean;
  showUpdate! : boolean;
  constructor( private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.emloyeeModelObj.firstName = this.formValue.value.firstName;
    this.emloyeeModelObj.lastName = this.formValue.value.lastName;
    this.emloyeeModelObj.email = this.formValue.value.email;
    this.emloyeeModelObj.mobile = this.formValue.value.mobile;
    this.emloyeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmploye(this.emloyeeModelObj)
    .subscribe(res => {
      console.log(res)
      alert("Employee added")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset();
      this.getAllEmployee();
    },
    
    err=>{
      alert("Something gone wrong")
    })
  }
  getAllEmployee(){
    this.api.getEmploye()
    .subscribe(res => {
      this.employeeData = res;
    })
  }
  deleteEmployee(row: any){
    this.api.deleteEmploye(row.id)
    .subscribe(res => {
      alert("Employee deleted");
      this.getAllEmployee();
    })
  }
  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.emloyeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails(){
    this.emloyeeModelObj.firstName = this.formValue.value.firstName;
    this.emloyeeModelObj.lastName = this.formValue.value.lastName;
    this.emloyeeModelObj.email = this.formValue.value.email;
    this.emloyeeModelObj.mobile = this.formValue.value.mobile;
    this.emloyeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.emloyeeModelObj, this.emloyeeModelObj.id)
    .subscribe(res => {
      alert("Update")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}

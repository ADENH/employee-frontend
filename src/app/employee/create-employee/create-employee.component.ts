import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResPosition, Position } from 'src/app/model/api.res';
import { EmployeePost } from 'src/app/model/employee.post';
import { EmployeeService } from 'src/app/service/employee.service';
import { PositionService } from 'src/app/service/position.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsDatepickerConfig, BsDatepickerDirective, BsDatepickerModule, BsLocaleService, DatepickerConfig, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeData = new FormGroup({
    nama: new FormControl(''),
    tanggalLahir : new FormControl(''),
    jabatan: new FormControl(''),
    nip: new FormControl(''),
    jenisKelamin: new FormControl(''),
  })
  employee: EmployeePost = new EmployeePost();
  apiResponse: ApiResPosition = new ApiResPosition();
  submitted = false;
  currentDate = new Date()
  
  constructor(private positionService: PositionService,private employeeService: EmployeeService,
     private router: Router) { }

  ngOnInit(): void {
    this.positionService.getPositions().subscribe(
      resp => { 
        console.log(resp.body.content)
        this.apiResponse = {
        content : resp.body.content,
        pageable : resp.body.pageable,
        last : resp.body.last,
        totalElements : resp.body.totalElements,
        totalPages : resp.body.totalPages,
        size : resp.body.size,
        number : resp.body.number,
        sort : resp.body.sort,
        first: resp.body.first,
        numberOfElements : resp.body.numberOfElements,
        empty : resp.body.empty,
      }}
    )
  }

  onSubmit(): void {
    var event = new Date(this.employeeData.value.tanggalLahir);
    let date = JSON.stringify(event)
    date = date.slice(1,11)
    console.log(date)
    this.submitted = true;
    this.employee.tanggalLahir = date
    this.employee.jenisKelamin = this.employeeData.value.jenisKelamin
    this.employee.codeJabatan = this.employeeData.value.jabatan
    console.log(this.employee)
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => console.log(data), err => console.log(err));
    this.employee = new EmployeePost();
    this.router.navigate(['/employees']);
  }

  changeGender(e) {
    console.log(e.target.value);
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

}

import { Component, OnInit, TemplateRef } from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiRes } from 'src/app/model/api.res';
import { ApiResponse } from 'src/app/model/api.response';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/service/employee.service';
import { map, catchError } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  apiResponse: ApiRes;
  message: string;
  modalRef: BsModalRef;

  constructor(private employeeService: EmployeeService,private modalService: BsModalService,
    private router:Router) { 
      setTimeout(function () {
        $(function () {
          $('#example').DataTable();
        })
      },5000);
    }

  ngOnInit(): void {

    this.employeeService.getEmployees().subscribe(
      resp => {
        const key = resp.headers.keys();
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
        };
      }
    )
      
    setTimeout(function () {
      $(function () {
        $('#example').DataTable();
      })
    },5000);
  }

  deleteEmployee(id: any) {
    console.log('id number ',id)
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data.name);
      console.log(data.isDelete)
    })
  }

  confirm(): void {
    console.log(this.modalRef.content)
    this.deleteEmployee(this.modalRef.content.value)
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  openConfirmDialog(template: TemplateRef<any>,id:number){
    const initialState = {
      class: 'modal-sm',
      value: id
    };
    this.modalRef = this.modalService.show(template,initialState);
    this.modalRef.content = { value: id };
    // this.modalRef.content = {  }
  }

  updateEmployee(id: number){
    this.router.navigate(['update', id]);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResPosition } from 'src/app/model/api.res';
import { ApiResponse } from 'src/app/model/api.response';
import { Employee } from 'src/app/model/employee.model';
import { EmployeePost } from 'src/app/model/employee.post';
import { EmployeePostResponse } from 'src/app/model/employee.post.response';
import { EmployeeResponseByNip } from 'src/app/model/EmployeeResponseByNip.model';
import { EmployeeService } from 'src/app/service/employee.service';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employeeData = new FormGroup({
    nama: new FormControl(''),
    tanggalLahir : new FormControl(''),
    jabatan: new FormControl(''),
    nip: new FormControl(''),
    jenisKelamin: new FormControl(''),
  })
  employee: EmployeeResponseByNip = new EmployeeResponseByNip();
  employeePostData: EmployeePost = new EmployeePost();
  apiResponse: ApiResPosition = new ApiResPosition();
  submitted = false;
  currentDate = new Date();
  id: number;
  codeJabatanUser:string;
  jabatanUser:string;


  constructor(private route: ActivatedRoute,
    private router:Router,
    private positionService: PositionService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(`Ini id data `,this.id)
    this.employeeService.getEmployeeByNip(this.id).subscribe(
      response => {
        console.log(response)
        this.employeeData.controls.jabatan.setValue(response.jabatan)
        this.jabatanUser = response.jabatan
        this.employee = {
          nama :response.nama,
          tanggalLahir : new Date(response.tanggalLahir),
          jenisKelamin : response.jenisKelamin,
          nip : response.nip,
          codeJabatan : response.codeJabatan,
          jabatan : response.jabatan

        }
      }
    )
    
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

    
  this.codeJabatanUser = this.apiResponse.content.find( x => x.name === this.employeeData.value.jabatan).code;
    

    var event = new Date(this.employeeData.value.tanggalLahir);
    let date = JSON.stringify(event)
    date = date.slice(1,11)
    console.log(date)
    console.log(this.codeJabatanUser)
    // console.log(this.employeeData.value.jenisKelamin)
    this.submitted = true;
    this.employeePostData.nama = this.employeeData.value.nama
    this.employeePostData.tanggalLahir = date
    // this.employeePostData.jenisKelamin = this.employeeData.value.jenisKelamin
    this.employeePostData.codeJabatan = this.codeJabatanUser
    this.employeePostData.jabatan = this.employeeData.value.jabatan
    this.employeePostData.nip = this.employeeData.value.nip
    console.log(this.employeePostData)
    console.log('ini tip ',this.employee.nip)
    this.employeeService.updateEmployee(this.employee.nip,this.employeePostData)
    .subscribe(
      data => console.log(data),
      error => console.log(error));
    this.employeePostData = new EmployeePost();
    this.router.navigate(['/employees'])
  }
  
  list(){
    this.router.navigate(['employees']);
  }

  changeGender(e) {
    this.employeePostData.jenisKelamin = e.target.value
    console.log(e.target.value);
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  

}

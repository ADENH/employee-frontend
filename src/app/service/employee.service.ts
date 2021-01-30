import { Injectable } from '@angular/core';
import {ApiResponse} from 'src/app/model/api.response'
import {Employee} from 'src/app/model/employee.model'
import {HttpClient, HttpResponse} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ApiRes } from '../model/api.res';
import { EmployeePost } from '../model/employee.post';
import { EmployeePostResponse } from '../model/employee.post.response';
import { EmployeeResponseByNip } from '../model/EmployeeResponseByNip.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  baseUrl:string = 'http://localhost:8080/api/employee/';

  getEmployees():Observable<HttpResponse<ApiRes>>{
    return this.http.get<ApiRes>(this.baseUrl,{observe:'response'});
  }

  getEmployeeById(id:number):Observable<any>{
    return this.http.get(this.baseUrl + id);
  }

  getEmployeeByNip(id:number):Observable<EmployeeResponseByNip>{
    return this.http.get<EmployeeResponseByNip>(this.baseUrl+ '/idNumber/' + id);
  }

  createEmployee(employee:EmployeePost):Observable<EmployeePostResponse>{ 
    return this.http.post<EmployeePostResponse>(this.baseUrl,employee);
  }

  updateEmployee(id:number, employee:EmployeePost):Observable<EmployeePostResponse>{
    console.log(employee)
    return this.http.put<EmployeePostResponse>(this.baseUrl + id,employee);
  }

  deleteEmployee(id:number):Observable<EmployeePostResponse>{
    return this.http.delete<EmployeePostResponse>(this.baseUrl + id);
  }

}

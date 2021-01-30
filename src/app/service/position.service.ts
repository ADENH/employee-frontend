import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResPosition } from '../model/api.res';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http:HttpClient) { }
  baseUrl:string = 'http://localhost:8080/api/positions/';

  getPositions():Observable<HttpResponse<ApiResPosition>>{
    return this.http.get<ApiResPosition>(this.baseUrl,{observe:'response'});
  }
}

import { Observable } from "rxjs";
import { ApiResponse } from "./api.response";
import { Employee } from "./employee.model";

export class ApiRes{
    content:Employee[];
    pageable:Pageable;
    last:boolean
    totalElements:number;
    totalPages:number;
    size:number;
    number:number;
    sort:Sort;
    first:boolean;
    numberOfElements:number;
    empty:boolean;
}

export class ApiResPosition{
    content:Position[];
    pageable:Pageable;
    last:boolean
    totalElements:number;
    totalPages:number;
    size:number;
    number:number;
    sort:Sort;
    first:boolean;
    numberOfElements:number;
    empty:boolean;
}

export interface Position{
    id:number;
    code:string;
    name:string;
    isDelete:number;
}

export interface Pageable{
    sort:Sort;
    offset:number;
    pageNumber:number;
    pageSize:number;
    unpaged:boolean;
    paged:boolean;
}

export interface Sort{
    sorted:boolean;
    unsorted:boolean;
    empty:boolean;
}
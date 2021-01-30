import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { EmployeesListComponent } from './employee/employees-list/employees-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './service/employee.service';
import { CreatePositionComponent } from './position/create-position/create-position.component';
import { UpdatePositionComponent } from './position/update-position/update-position.component';
import { PositionsListComponent } from './position/positions-list/positions-list.component';
import {BsDatepickerInlineConfig, BsDatepickerConfig,  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ModalModule} from 'ngx-bootstrap/modal'

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeesListComponent,
    CreatePositionComponent,
    UpdatePositionComponent,
    PositionsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    
    
  ],
  providers: [EmployeeService,BsDatepickerInlineConfig,BsDatepickerConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }

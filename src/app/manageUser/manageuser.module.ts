import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageuserRoutingModule } from './manageuser-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    ManageuserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ]
})
export class ManageuserModule { }

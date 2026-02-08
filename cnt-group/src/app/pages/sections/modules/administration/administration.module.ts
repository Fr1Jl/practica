import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdministrationRoutingModule } from './administration-routing';
import { FormsModule } from '@angular/forms';
import { AddUserFormComponent } from './pages/users-page/components/add-user-form/add-user-form.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    UsersPageComponent,
    AddUserFormComponent
  ],
  imports: [
    AdministrationRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class AdministrationModule { }
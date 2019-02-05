import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicComponent } from './public/public.component';
import { SigninComponent } from './public/signin/signin.component';
import { StaffComponent } from './protected/staff/staff.component';
import { AdminComponent } from './protected/admin/admin.component';
import { StudentComponent } from './protected/student/student.component';

const routes: Routes = [
  {path: '', component: PublicComponent, children: [{path: 'signin', component: SigninComponent}]},
  {path: 'staff', component: StaffComponent, children: []},
  {path: 'admin', component: AdminComponent, children: []},
  {path: 'student', component: StudentComponent, children: []},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

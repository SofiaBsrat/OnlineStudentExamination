import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { SigninComponent } from './public/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StaffComponent } from './protected/staff/staff.component';
import { AdminComponent } from './protected/admin/admin.component';
import { StudentComponent } from './protected/student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    SigninComponent,
    StaffComponent,
    AdminComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

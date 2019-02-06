import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StaffService } from 'src/app/services/staff.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit, OnDestroy {

  staffForm: FormGroup;
  staffList: any[];
  isLoaded = false;
  control: any;
  staffSubscrption: Subscription;

  constructor(private formBuilder: FormBuilder, private staffService: StaffService) { 
    this.staffForm = formBuilder.group({
      'name': ['', Validators.required],
      'username': ['', Validators.required],
    });
    this.control = this.staffForm.controls;
  }

  ngOnInit() {
    this.staffSubscrption = this.staffService.getStaff().subscribe(data => {
      if (data['status'] === 200) {
        this.isLoaded = true;
        this.staffList = data['data'];
      }
    });
  }

  ngOnDestroy() {
    if (this.staffSubscrption) {
      this.staffSubscrption.unsubscribe();
    }
  }

  onSubmit() {
    const staff = {
      name: this.control.name.value,
      username: this.control.username.value
    };

    this.staffService.addStaff(JSON.stringify(staff)).subscribe((response: any) => {
      
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from 'src/app/services/student.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  invitedStudents: any[];
  isLoaded = false;
  constructor(private studentService: StudentService, private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    // this.studentService.getInvitedStudents().subscribe(data => {
    //   if (data['status'] === 200) {
    //     this.isLoaded = true;
    //     this.invitedStudents = data['data'];
    //   }
    // });
  }

  signout() {
    this.tokenService.removeToken();
    this.router.navigate(['/about']);
  }

}

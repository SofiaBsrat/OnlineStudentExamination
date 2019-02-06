import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {
  uninvitedStudents: any[];
  isLoaded = false;
  studentSubscrption: Subscription;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentSubscrption = this.studentService.getUninvitedStudents().subscribe(data => {
      if (data['status'] === 200) {
        this.isLoaded = true;
        this.uninvitedStudents = data['data'];
      }
    });
  }
  sendInvitation(id) {
    const student = this.uninvitedStudents.filter(stu => stu._id === id);
    const reqBody = {
      student_id: student[0]._id,
      name: student[0].name,
      entry: student[0].entry,
      date_of_birth: student[0].date_of_birth
    };
    this.studentService.sendInvitation(reqBody).subscribe(data => {
      if (data['status'] === 200) {
        console.log('Invitation Successful.');
      } else {
        console.log('Invitation Unsuccessful.');
      }
    });
  }

  ngOnDestroy() {
    if (this.studentSubscrption) {
      this.studentSubscrption.unsubscribe();
    }
  }


}


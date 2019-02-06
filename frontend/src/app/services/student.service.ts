import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private configService: ConfigService) {

  }
  getStudents() {
    return this.http.get(this.configService.BASE_API_URL + '/students');
  }

  // getUninvitedStudents() {
  //   return this.http.get(this.configService.BASE_API_URL + '/students?invited=false');
  // }
  // getInvitedStudents() {
  //   return this.http.get(this.configService.BASE_API_URL + '/students?invited=true');
  // }

  sendInvitation(student) {
    return this.http.patch(
      `${this.configService.BASE_API_URL}/students/${student._id}?invite=true`, student, httpOptions
    );
  }

  // validate token and get an exam (3 random questions)
  getExam(token: string) {
    // return this.http.get(this.configService.BASE_API_URL + '/questions/validatetokenandgetquestions/' + token);
    return this.http.get(this.configService.BASE_API_URL + '/questions');

  }
  submitExam(report) {
    return this.http.patch(
      `${this.configService.BASE_API_URL}/student/report.studentid`,
      { date: Date.now(), questions: report.questions }, httpOptions
    );
  }
}

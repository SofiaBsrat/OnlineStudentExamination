import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private configService: ConfigService) {

  }
  getUninvitedStudents() {
    return this.http.get(this.configService.BASE_API_URL + '/students?invited=false');
  }
  sendInvitation(reqBody) {
    return this.http.post(this.configService.BASE_API_URL + '/students?invite=true', reqBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  getInvitedStudents() {
    return this.http.get(this.configService.BASE_API_URL + '/students?invited=true');
  }

  // validate token and get an exam (3 random questions)
  getExam(token: string) {
    // return this.http.get(this.configService.BASE_API_URL + '/questions/validatetokenandgetquestions/' + token);
    return this.http.get(this.configService.BASE_API_URL + '/questions');

  }
  submitExamService(report) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.patch(
      `${this.configService.BASE_API_URL}/student/report.studentid`,
      { date: Date.now(), questions: report.questions }, httpOptions
    );
  }
}

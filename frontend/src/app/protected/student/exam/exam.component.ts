import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { timer, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, OnDestroy {
  private studentIdFromParent: number;

  isLoaded = false;
  examForm: FormGroup;
  time = 7200;
  hours: number;
  minutes: number;
  seconds: number;

  examSubscriber: Subscription;
  timerSubscriber: Subscription;
  answer1Subscriber: Subscription;
  answer2Subscriber: Subscription;
  answer3Subscriber: Subscription;
  getQuesSubsrciber: Subscription;
  exam = {
    'studentid': String,
    questions: []
  };

  constructor(private fb: FormBuilder, private currentRoute: ActivatedRoute, private studentService: StudentService,
    private route: Router) {
    this.examSubscriber = this.currentRoute.parent.params.subscribe(params => {
      this.studentIdFromParent = + params['id'];
      console.log(this.studentIdFromParent);
    });
    this.examForm = this.fb.group({
      'question1': '',
      'question2': '',
      'question3': '',
      'answer1': ['', Validators.required],
      'answer2': ['', Validators.required],
      'answer3': ['', Validators.required]

    });
  }

  ngOnInit() {
    this.isLoaded = true;
    this.examForm.setValue({
      'question1': 'Q1',
      'answer1': '',
      'question2': 'Q2',
      'answer2': '',
      'question3': 'Q3',
      'answer3': ''

    });
    this.startTimer();
  }

  subscribeAnswers() {
    this.answer1Subscriber = this.examForm.get('answer1').valueChanges.pipe(debounceTime(2000)
    ).subscribe(x => {
      this.exam.questions[0].snapshots.push(x);
      console.log('a ' + x);
    });
    this.answer2Subscriber = this.examForm.get('answer2').valueChanges.pipe(debounceTime(2000)
    ).subscribe(x => {
      this.exam.questions[1].snapshots.push(x);
    });
    this.answer3Subscriber = this.examForm.get('answer3').valueChanges.pipe(debounceTime(2000)
    ).subscribe(x => {
      this.exam.questions[2].snapshots.push(x);
    });
  }

  startTimer() {
    this.timerSubscriber = timer(0, 1000).subscribe(t => {
      const counter = this.time - t;
      this.minutes = Math.floor(counter / 60);
      this.seconds = counter % 60;
      if (counter < 0) {
        this.isLoaded = false;
        this.timerSubscriber.unsubscribe();
      }
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.exam.questions[0].answer = form.value.answer1;
    this.exam.questions[1].answer = form.value.answer2;
    this.exam.questions[2].answer = form.value.answer3;
    console.log(this.exam);
    this.studentService.submitExam(this.exam).subscribe((data) => {
      if (data['status'] === '200') {
        this.examForm.reset();
        this.isLoaded = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.examSubscriber) { this.examSubscriber.unsubscribe(); }
    if (this.timerSubscriber) { this.timerSubscriber.unsubscribe(); }
    if (this.answer1Subscriber) { this.answer1Subscriber.unsubscribe(); }
    if (this.answer2Subscriber) { this.answer2Subscriber.unsubscribe(); }
    if (this.answer3Subscriber) { this.answer3Subscriber.unsubscribe(); }
    if (this.getQuesSubsrciber) { this.getQuesSubsrciber.unsubscribe(); }
  }

}

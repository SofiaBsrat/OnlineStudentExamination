import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questionForm: FormGroup;
  questionList: any[];
  isLoaded = false;
  control: any;
  questionSubscrption: Subscription;

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService) { 
    this.questionForm = formBuilder.group({
      'category': ['', Validators.required],
      'question': ['', Validators.required],
      'active': ['', Validators.required]
    });
    this.control = this.questionForm.controls;
  }

  ngOnInit() {
    this.questionSubscrption = this.questionService.getQuestions().subscribe(data => {
      if (data['status'] === 200) {
        this.isLoaded = true;
        this.questionList = data['data'];
      }
    });
  }

  ngOnDestroy() {
    if (this.questionSubscrption) {
      this.questionSubscrption.unsubscribe();
    }
  }

  onSubmit() {
    const questionObj = {
      category: this.control.category.value,
      question: this.control.question.value,
      active: this.control.active.value,
    };

    this.questionService.addQuestion(JSON.stringify(questionObj)).subscribe((response: any) => {
      
    });
  }
}

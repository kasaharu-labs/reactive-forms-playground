import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'reactive-forms-playground';

  todoForm = new FormGroup({
    list: new FormArray([new FormControl('')]),
  });

  ngOnInit(): void {
    this.todoForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  addNewTaskForm() {
    this.todoForm.controls.list.push(new FormControl(''));
  }

  onPaste(event: ClipboardEvent, index: number) {
    const inputData = event.clipboardData?.getData('text');
    const [first, ...rest] = inputData?.split('\n') ?? [];

    setTimeout(() => {
      this.todoForm.controls.list.controls[index].setValue(first);
    }, 0);

    rest.forEach((item) => {
      this.todoForm.controls.list.push(new FormControl(item));
    });
  }
}

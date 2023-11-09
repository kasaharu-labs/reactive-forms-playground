import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
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

  copyTask(): void {
    const { list } = this.todoForm.getRawValue();
    if (list.length === 0) return;

    const listString = list.join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(listString);
    }
  }
}

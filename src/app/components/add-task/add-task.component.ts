import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  text: string = '';

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.text.length <= 3) {
      alert('To do shall contain more than 3 characters');
      return;
    }
    const newTask: Task = {
      text: this.text,
      status: 'todo',
    };

    this.onAddTask.emit(newTask);

    this.text = '';
  }
}

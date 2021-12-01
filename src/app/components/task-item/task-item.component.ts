import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onChangeState: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;

  constructor() {}

  ngOnInit(): void {}

  onDelete(task: Task) {
    if (task.status === 'todo') {
      if (
        confirm(
          'This task has not been finished yet. Are you sure you want to delete it?'
        )
      ) {
        task.status = 'deleted';
        this.onDeleteTask.emit(task);
      }
    } else {
      task.status = 'deleted';
      this.onDeleteTask.emit(task);
    }
  }

  toggleStatus(task: Task) {
    task.status === 'todo' ? (task.status = 'done') : (task.status = 'todo');
    this.onChangeState.emit(task);
  }
}

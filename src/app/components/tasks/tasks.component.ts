import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.arrangeTasks();
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  changeState(task: Task) {
    this.taskService
      .changeState(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
    var list = this;
    setTimeout(function () {
      list.arrangeTasks();
    }, 100);
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
    this.arrangeTasks();
  }

  // Arrange tasks in order that todo tasks stay on top
  arrangeTasks() {
    this.taskService
      .getTasks()
      .subscribe(
        (tasks) => (this.tasks = tasks.filter((t) => t.status === 'todo'))
      );

    this.taskService
      .getTasks()
      .subscribe(
        (tasks) =>
          (this.tasks = this.tasks.concat(
            tasks.filter((t) => t.status === 'done')
          ))
      );
  }
}

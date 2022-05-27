import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandler } from '../services/error-handler.service';
import { ToastrService } from 'ngx-toastr';

import { HTTPService } from '../services/http.service';
import { TaskDialogComponent, TaskDialogResult } from '../task-dialog/task-dialog.component';
import { Task, TaskTable } from '../task/task';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todo: Task[] = [];
  open: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  userName: string | null = null;

  constructor(private dialog: MatDialog,
              private httpService: HTTPService,
              private errorHandler: ErrorHandler,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem("userName");

    this.httpService.post("getTasks", {username: this.userName}).subscribe( data => {
      data.msg.forEach((task: Task) => {
        switch (task.table) {
          case TaskTable.NEW:
            this.todo.push(task);
            break;
          case TaskTable.IN_PROGRESS:
            this.inProgress.push(task);
            break;
          case TaskTable.OPEN:
            this.open.push(task);
            break;
          case TaskTable.DONE:
            this.done.push(task);
            break;
          default:
            break;
        }
      });
    }, err => {
      this.errorHandler.handleError(err);
    });
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      disableClose: true,
      width: '500px',
      data: {
        task: {},
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
        if (!result) {
          return;
        }
        // update DB with the new task
        var newTask = result.task;
        newTask.table = TaskTable.NEW;
        this.httpService.post("addTasks",{newTask}).subscribe(data => {
          // TODO: add the new task to the todo array
          if(this.userName == data.msg[data.msg.length - 1].userName)
            this.todo.push(data.msg[data.msg.length - 1]);
          this.toastr.success("New task added successfuly!")
        }, err => {
          this.errorHandler.handleError(err);
        })
    });
  }

  editTask(list: 'done' | 'todo' | 'open' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      disableClose: true,
      width: '500px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
      console.log(result)
      if (!result) {
        return;
      }
      const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      if (result.delete) {
        dataList.splice(taskIndex, 1);
      } else {
        dataList[taskIndex] = task;

        // update task in DB
        this.httpService.post("updateTask", task).subscribe(data => {
          // TODO: handle errors
          if(data.msg[0].userName != this.userName)
            dataList.splice(taskIndex, 1)
          this.toastr.success("The task update successfuly!")
          console.log(data);
        })
      }

    });
  }

  drop(event: CdkDragDrop<Task[] | any>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    console.log(event.container.data[event.currentIndex]);
    event.container.data[event.currentIndex].table = event.container.id;
    // TODO: handle errors
    this.httpService.post("updateTask", event.container.data[event.currentIndex]).subscribe(data => {
      console.log(data);
    })
  }

  
}

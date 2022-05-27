import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HTTPService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';

import { Task } from '../task/task';

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  private backupTask: Partial<Task> = { ...this.data.task };
  minDate: Date = new Date();
  userNames: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private httpService: HTTPService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserNames();
  }

  getUserNames(){
    this.httpService.get("getUsers").subscribe(data =>{
      const users = data.msg;
      for (let i = 0; i < users.length; i++) {
        this.userNames.push(users[i].userName);
      }
    })
  }

  cancel(): void {
    if(Object.keys(this.backupTask).length === 0){
      this.dialogRef.close(undefined);
    } else{
      this.data.task.title = this.backupTask.title;
      this.data.task.description = this.backupTask.description;
      this.data.task.finishDate = this.backupTask.finishDate;
      this.data.task.priority = this.backupTask.priority;
      this.data.task.userName = this.backupTask.userName;
      // this.dialogRef.close(this.data);
      this.dialogRef.close(undefined);
    }
  }

  deleteTask(){
    // delete task from DB
    this.httpService.post("deleteTask", this.backupTask).subscribe(res => {
      this.toastr.success("The task deleted successfuly!")
    })
  }

  pressingOk(task: any){
    // if validation pass close the dialog
    if(this.taskValidation(task)){
      this.dialogRef.close({ task: task })
    }
  }

  taskValidation(task: any): boolean{
    console.log(task)
    if(!("userName" in task)){
      this.toastr.error("You need to select a user");
      return false
    } else if(!("finishDate" in task) || task.finishDate == null){
      this.toastr.error("You need to select finish date");
      return false
    } else if(!("title" in task) || task.title == ""){
      this.toastr.error("You need to enter title");
      return false
    } else if(!("description" in task) || task.description == ""){
      this.toastr.error("You need to enter description");
      return false
    } else if(!("priority" in task)){
      this.toastr.error("You need to select priority");
      return false
    } 
    return true
  }

}

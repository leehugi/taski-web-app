import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
  today: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  compareDates(taskDate: Date){
    var newTaskDate  = new Date(taskDate).getTime()

    if(this.today.getTime() < newTaskDate){
      return true
    }
    return false;
  }

}

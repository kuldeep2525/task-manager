import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AppConstants } from '../../../constants/app.constants';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.scss']
})
export class TaskListsComponent implements OnInit {

  @Input() todoList;
  @Input() inProgressList;
  @Input() doneList;
  @Output() addTask: EventEmitter<any> = new EventEmitter();
  @Output() removeTask: EventEmitter<any> = new EventEmitter();
  @Output() dropTask: EventEmitter<any> = new EventEmitter();

  todoListLable = AppConstants.LABLES.TODOLIST;
  inProgressListLable = AppConstants.LABLES.INPRGOGRESSLIST;
  doneListLable = AppConstants.LABLES.DONELIST;
  addCardLable = AppConstants.LABLES.ADDCARD;
  addAnotherCardLable = AppConstants.LABLES.ADDANOTHERCARD;
  


  constructor() { }

  ngOnInit() {

  }

  onAddTask(list, selectedList) {
    const addTaskModalobj = { list: list, selectedList: selectedList }
    this.addTask.emit(addTaskModalobj);
  }

  onRemoveTask(selectedList, taskIndex) {
    const removeTaskobj = { selectedList: selectedList, taskIndex: taskIndex }
    this.removeTask.emit(removeTaskobj);
  }

  onDropTask(event: CdkDragDrop<string[]>) {
    this.dropTask.emit(event);
  }
}

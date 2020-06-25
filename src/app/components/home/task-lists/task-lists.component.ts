import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AppConstants } from '../../../constants/app.constants';
import { NGXLogger } from 'ngx-logger';

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

  constructor(private logger: NGXLogger) {
    this.logger.debug('Loaded TaskLists Component');
  }

  ngOnInit() {

  }

  /**
   * on click add task 
   */
  onAddTask(list, selectedList) {
    this.logger.debug('Inside TaskLists Component onAddTask()');
    const addTaskModalobj = { list: list, selectedList: selectedList }
    this.addTask.emit(addTaskModalobj);
  }

  /**
  * on click remove task 
  */
  onRemoveTask(selectedList, taskIndex) {
    this.logger.debug('Inside TaskLists Component onRemoveTask()');
    const removeTaskobj = { selectedList: selectedList, taskIndex: taskIndex }
    this.removeTask.emit(removeTaskobj);
  }

  /**
  * on drop task 
  */
  onDropTask(event: CdkDragDrop<string[]>) {
    this.logger.debug('Inside TaskLists Component onDropTask()');
    this.dropTask.emit(event);
  }
}

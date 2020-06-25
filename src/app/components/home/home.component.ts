import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ConfirmationDialogService } from '../dialogs/confirmation-dialog/confirmation-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeFacade } from './home.facade';
import { AppState } from '../../state/app.state'
import { AddTaskDialogComponent } from '../dialogs/add-task-dialog/add-task-dialog.component';
import { AppConstants } from '../../constants/app.constants';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NGXLogger]
})
export class HomeComponent implements OnInit {
  todoList = [];
  inProgressList = [];
  doneList = [];
  appName = AppConstants.LABLES.APPNAME

  constructor(private confirmationDialogService: ConfirmationDialogService, public modalService: NgbModal, public homeFacade: HomeFacade, private logger: NGXLogger) {
    this.logger.debug('Loaded HomeComponent');
    //subscribe state to get latest data from app state
    this.homeFacade.getAppState().subscribe((state: AppState) => {
      this.logger.debug('AppState', state);
      this.todoList = state.task.todoList;
      this.inProgressList = state.task.inProgressList;
      this.doneList = state.task.doneList;
    }, (error: Error) => {
      this.logger.error('Error to get AppState', error);
    });
  }

  ngOnInit() {

  }

  /**
    * emmit this function when click on add task from task-list component(child)
    */
  onAddTask($event) {
    this.logger.debug('Inside Home Component onAddTask()');
    const modalRef = this.modalService.open(AddTaskDialogComponent);
    modalRef.componentInstance.parentData = {
      list: $event.list
    }

    //open dialog to enter task data
    modalRef.result.then((result) => {
      if (!result.isError && result.task) {
        //update state after add task into lists
        if ($event.selectedList == 'todo') {
          this.todoList.push(result.task);
          this.homeFacade.setTodoState(this.todoList);
          this.logger.info('onAddTask updated todoList', this.todoList);
        }
        if ($event.selectedList == 'inProgress') {
          this.inProgressList.push(result.task);
          this.homeFacade.setInprogressState(this.inProgressList);
          this.logger.info('onAddTask updated inProgressList', this.inProgressList);
        }
        if ($event.selectedList == 'done') {
          this.doneList.push(result.task);
          this.homeFacade.setDoneState(this.doneList);
          this.logger.info('onAddTask updated doneList', this.doneList);
        }
      }
    }).catch((result) => {

    });
  }

  /**
    * emmit this function when click on remove task from task-list component(child)
    */
  onRemoveTask($event) {
    this.logger.debug('Inside Home Component onRemoveTask()');
    //open dialog to confirm to delete task
    this.confirmationDialogService.confirm(AppConstants.LABLES.CONFIRM, AppConstants.MESSEGES.CONFIRMTASK)
      .then((confirmed) => {

        if (confirmed) {
          //update state after remove task from list
          if ($event.selectedList == 'todo') {
            this.todoList.splice($event.taskIndex, 1);
            this.homeFacade.setTodoState(this.todoList);
            this.logger.info('onRemoveTask updated inProgressList', this.todoList);
          }
          if ($event.selectedList == 'inProgress') {
            this.inProgressList.splice($event.taskIndex, 1);
            this.homeFacade.setTodoState(this.inProgressList);
            this.logger.info('onRemoveTask updated inProgressList', this.inProgressList);

          }
          if ($event.selectedList == 'done') {
            this.doneList.splice($event.taskIndex, 1);
            this.homeFacade.setTodoState(this.doneList);
            this.logger.info('onRemoveTask updated inProgressList', this.doneList);
          }
        }
      })
      .catch(() => {
        this.logger.info('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)');
      })
  }

  /**
    * emmit this function when drop task from task-list component(child)
    */
  onDropTask(event: CdkDragDrop<string[]>) {
    this.logger.debug('Inside Home Component onDropTask()');
    this.logger.debug('onDropTask EVENT', event);
    if (event.previousContainer === event.container) {
      //drop into self list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      //update state of list 
      if (event.container.id == 'todo') {
        this.homeFacade.setTodoState(event.previousContainer.data);
      }
      if (event.container.id == 'inProgress') {
        this.homeFacade.setInprogressState(event.previousContainer.data);
      }
      if (event.container.id == 'done') {
        this.homeFacade.setDoneState(event.previousContainer.data);
      }
    } else {
      //drop into another list
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      //update state of old list data (from which task selected)
      if (event.previousContainer.id == 'todo') {
        this.homeFacade.setTodoState(event.previousContainer.data);
      }
      if (event.previousContainer.id == 'inProgress') {
        this.homeFacade.setInprogressState(event.previousContainer.data);
      }
      if (event.previousContainer.id == 'done') {
        this.homeFacade.setDoneState(event.previousContainer.data);
      }

      //update state of new list data (in which task dropped)
      if (event.container.id == 'todo') {
        this.homeFacade.setTodoState(event.container.data);
      }
      if (event.container.id == 'inProgress') {
        this.homeFacade.setInprogressState(event.container.data);
      }
      if (event.container.id == 'done') {
        this.homeFacade.setDoneState(event.container.data);
      }
    }
  }

}

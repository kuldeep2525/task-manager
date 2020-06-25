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

    this.homeFacade.getState().subscribe((state: AppState) => {
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

  // ADD TASK
  onAddTask($event) {
    this.logger.debug('Inside Home Component onAddTask()');
    const modalRef = this.modalService.open(AddTaskDialogComponent);
    modalRef.componentInstance.parentData = {
      list: $event.list
    }

    modalRef.result.then((result) => {
      if (!result.isError && result.task) {
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

  // REMOVE TASK
  onRemoveTask($event) {
    this.logger.debug('Inside Home Component onRemoveTask()');
    this.confirmationDialogService.confirm(AppConstants.LABLES.CONFIRM, AppConstants.MESSEGES.CONFIRMTASK)
      .then((confirmed) => {

        if (confirmed) {
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

  //DROP TASK
  onDropTask(event: CdkDragDrop<string[]>) {
    this.logger.debug('Inside Home Component onDropTask()');
    this.logger.debug('onDropTask EVENT', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);

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
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      if (event.previousContainer.id == 'todo') {
        this.homeFacade.setTodoState(event.previousContainer.data);
      }
      if (event.previousContainer.id == 'inProgress') {
        this.homeFacade.setInprogressState(event.previousContainer.data);
      }
      if (event.previousContainer.id == 'done') {
        this.homeFacade.setDoneState(event.previousContainer.data);
      }

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

import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeFacade } from './home.facade';
import { AppState } from '../../state/app.state'

import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todoList = [];
  inProgressList = [];
  doneList = [];

  constructor(private confirmationDialogService: ConfirmationDialogService, public modalService: NgbModal, public mainviewFacade: HomeFacade) {

    this.mainviewFacade.getState().subscribe((state: AppState) => {
      console.log("state =", state)
      this.todoList = state.task.todoList;
      this.inProgressList = state.task.inProgressList;
      this.doneList = state.task.doneList;
    }, (error: Error) => {

    });

  }

  ngOnInit() {
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log(event);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      if (event.container.id == 'todo') {
        this.mainviewFacade.setTodoState(event.previousContainer.data);
      }
      if (event.container.id == 'inProgress') {
        this.mainviewFacade.setInprogressState(event.previousContainer.data);
      }
      if (event.container.id == 'done') {
        this.mainviewFacade.setDoneState(event.previousContainer.data);
      }
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      if (event.previousContainer.id == 'todo') {
        this.mainviewFacade.setTodoState(event.previousContainer.data);
      }
      if (event.previousContainer.id == 'inProgress') {
        this.mainviewFacade.setInprogressState(event.previousContainer.data);
      }
      if (event.previousContainer.id == 'done') {
        this.mainviewFacade.setDoneState(event.previousContainer.data);
      }

      if (event.container.id == 'todo') {
        this.mainviewFacade.setTodoState(event.container.data);
      }
      if (event.container.id == 'inProgress') {
        this.mainviewFacade.setInprogressState(event.container.data);
      }
      if (event.container.id == 'done') {
        this.mainviewFacade.setDoneState(event.container.data);
      }
    }
  }

  // ADD TASK
  onAddTask(selectedList, taskName) {
    if (selectedList == 'todo') {
      this.todoList.push(taskName);
      this.mainviewFacade.setTodoState(this.todoList);
    }

    if (selectedList == 'inProgress') {
      this.inProgressList.push(taskName);
      this.mainviewFacade.setInprogressState(this.inProgressList);
    }

    if (selectedList == 'done') {
      this.doneList.push(taskName);
      this.mainviewFacade.setDoneState(this.doneList);
    }
  }

  // REMOVE TASK
  onRemoveTask(selectedList, taskIndex) {
    this.onOpenConfirmRemoveTaskModal(selectedList, taskIndex);
  }

  public onOpenConfirmRemoveTaskModal(selectedList, taskIndex) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete task ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          if (selectedList == 'todo') {
            this.todoList.splice(taskIndex, 1);
            this.mainviewFacade.setTodoState(this.todoList);
          }
          if (selectedList == 'inProgress') {
            this.inProgressList.splice(taskIndex, 1);
            this.mainviewFacade.setTodoState(this.inProgressList);
          }
          if (selectedList == 'done') {
            this.doneList.splice(taskIndex, 1);
            this.mainviewFacade.setTodoState(this.doneList);
          }
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  //Save popup
  onOpenAddTaskDataModal(list, selectedList) {
    const modalRef = this.modalService.open(AddTaskDialogComponent);
    modalRef.componentInstance.parentData = {
      list: list,
      selectedList: selectedList
    }

    modalRef.result.then((result) => {
      if (!result.isError && result.task) {
        this.onAddTask(selectedList, result.task);
      }
    }).catch((result) => {

    });

  }

}

import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ConfirmationDialogService } from '../dialogs/confirmation-dialog/confirmation-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeFacade } from './home.facade';
import { AppState } from '../../state/app.state'
import { AddTaskDialogComponent } from '../dialogs/add-task-dialog/add-task-dialog.component';

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

  // ADD TASK
  onAddTask($event) {
    const modalRef = this.modalService.open(AddTaskDialogComponent);
    modalRef.componentInstance.parentData = {
      list: $event.list
    }

    modalRef.result.then((result) => {
      if (!result.isError && result.task) {
        if ($event.selectedList == 'todo') {
          this.todoList.push(result.task);
          this.mainviewFacade.setTodoState(this.todoList);
        }

        if ($event.selectedList == 'inProgress') {
          this.inProgressList.push(result.task);
          this.mainviewFacade.setInprogressState(this.inProgressList);
        }

        if ($event.selectedList == 'done') {
          this.doneList.push(result.task);
          this.mainviewFacade.setDoneState(this.doneList);
        }
      }
    }).catch((result) => {

    });
  }

  // REMOVE TASK
  onRemoveTask($event) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete task ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          if ($event.selectedList == 'todo') {
            this.todoList.splice($event.taskIndex, 1);
            this.mainviewFacade.setTodoState(this.todoList);
          }
          if ($event.selectedList == 'inProgress') {
            this.inProgressList.splice($event.taskIndex, 1);
            this.mainviewFacade.setTodoState(this.inProgressList);
          }
          if ($event.selectedList == 'done') {
            this.doneList.splice($event.taskIndex, 1);
            this.mainviewFacade.setTodoState(this.doneList);
          }
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  //DROP TASK
  onDropTask(event: CdkDragDrop<string[]>) {
    console.log("CdkDragDrop =", event)
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

}

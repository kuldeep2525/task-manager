import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeFacade } from './home.facade';
import { AppState } from '../../state/app.state'

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  addTaskDataForm: FormGroup;
  task = '';
  addTaskDataFormResponse;

  addTaskDataModalRef;
  selectedList;
  showErrorTaskExist = false;

  todoList = [];
  inProgressList = [];
  doneList = [];


  constructor(private confirmationDialogService: ConfirmationDialogService, private fb: FormBuilder, private modalService: NgbModal, public mainviewFacade: HomeFacade) {

    this.mainviewFacade.getState().subscribe((state: AppState) => {
      console.log("state =", state)
      this.todoList = state.task.todoList;
      this.inProgressList = state.task.inProgressList;
      this.doneList = state.task.doneList;
    }, (error: Error) => {

    });

  }

  ngOnInit() {
    this.addTaskDataForm = this.fb.group({
      task: ['', Validators.required]
    });
   
  }

  get addTaskDataFormControl() {
    return this.addTaskDataForm.controls;
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
      if (this.todoList.indexOf(taskName) > -1) {
        this.showErrorTaskExist = true;
      } else {
        this.todoList.push(taskName);
        this.mainviewFacade.setTodoState(this.todoList);
      }
    }

    if (selectedList == 'inProgress') {
      if (this.inProgressList.indexOf(taskName) > -1) {
        this.showErrorTaskExist = true;
      } else {
        this.inProgressList.push(taskName);
        this.mainviewFacade.setInprogressState(this.inProgressList);
      }
    }

    if (selectedList == 'done') {
      if (this.doneList.indexOf(taskName) > -1) {
        this.showErrorTaskExist = true;
      } else {
        this.doneList.push(taskName);
        this.mainviewFacade.setDoneState(this.doneList);
      }
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
  onOpenAddTaskDataModal(targetModal, selectedList) {  
    this.selectedList = selectedList;
    this.addTaskDataModalRef = this.modalService.open(targetModal);
  }

  onSubmitAddTaskDataForm() {
    this.addTaskDataFormResponse = this.addTaskDataForm.getRawValue();
    console.log("res:", this.addTaskDataFormResponse);
    this.onAddTask(this.selectedList, this.addTaskDataFormResponse.task);
    if (!this.showErrorTaskExist) {
      this.closeModal();
    }
  }

  removeCustomError() {
    this.showErrorTaskExist = false;
  }

  closeModal() {
    this.addTaskDataModalRef.close();
    this.addTaskDataForm.controls['task'].reset();
  }

}

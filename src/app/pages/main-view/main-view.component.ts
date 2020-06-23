import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
//import { Board } from 'src/app/models/board.model';
//import { Column } from 'src/app/models/column.model';

import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


declare var $: any;

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  list = [];
  saveDataModalInput = '';
  saveDataForm: FormGroup;
  saveDataFormResponse;
  saveDataModalRef;
  selectedData;
  showErrorListExist = false;
  showErrorTaskExist = false

  constructor(private confirmationDialogService: ConfirmationDialogService, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.saveDataForm = this.fb.group({
      saveDataModalInput: ['', Validators.required]
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  // LIST

  addList(listName) {
    let index = this.list.findIndex(x => x.listName == listName);
    if (index === -1) {
      this.list.push({ 'listName': listName });
    }else{
      this.showErrorListExist = true;
      console.log('list already exist');
      //this.showError('list already exist');
    }
  }

  deleteList(index) {
    this.openConfirmationDialog(index);
  }

  // TASK
  addTask(i, taskName) {
    console.log(this.list);
    if (this.list[i].taskList) {
      if (this.list[i].taskList.indexOf(taskName) > -1) {
        this.showErrorTaskExist = true;
      } else {
        this.list[i].taskList.push(taskName);
      }
    } else {
      this.list[i]['taskList'] = [taskName];
    }
  }

  deleteTask(listIndex, taskIndex) {
    this.openConfirmationDialogTaskList(listIndex, taskIndex);
  }

  //confirm popup
  public openConfirmationDialog(index) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete list ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          this.list.splice(index, 1);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  public openConfirmationDialogTaskList(listIndex, taskIndex) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete task ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          this.list[listIndex].taskList.splice(taskIndex, 1);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  //Save popup
  openModal(targetModal, data) {
    this.selectedData = data;
    this.saveDataModalRef = this.modalService.open(targetModal);

    // this.saveDataForm.patchValue({
    //  saveDataModalInput: saveDataModalInput
    // });
  }

  onSubmit() {
    this.saveDataFormResponse = this.saveDataForm.getRawValue();
    console.log("res:", this.selectedData);

    if (this.selectedData.modalName == 'list') {
      this.addList(this.saveDataFormResponse.saveDataModalInput);
    }
    if (this.selectedData.modalName == 'task') {
      this.addTask(this.selectedData.index, this.saveDataFormResponse.saveDataModalInput);
    }

    if(!this.showErrorListExist && !this.showErrorTaskExist){
      this.closeModal();
    }
  
  }

  removeError(){
    this.showErrorListExist = false;
    this.showErrorTaskExist = false;
  }

  closeModal() {
    this.saveDataModalRef.close();
    this.saveDataModalInput = '';
  }

  //Toaster

 
}

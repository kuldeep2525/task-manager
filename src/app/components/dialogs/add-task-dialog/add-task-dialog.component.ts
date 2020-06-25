import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from '../../../constants/app.constants';


@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
})


export class AddTaskDialogComponent implements OnInit {
  @Input() parentData: any;

  addTaskDataFormResponse;
  addTaskDataForm: FormGroup;
  showErrorTaskExist = false;
  sendData;
  clickCancel = false;
  addTaskLable = AppConstants.LABLES.ADDTASK;
  enterTaskLable = AppConstants.LABLES.ENTERTASK;
  closeBtn = AppConstants.BUTTONS.CLOSE;
  saveBtn = AppConstants.BUTTONS.SAVE;
  taskRequiredError = AppConstants.ERRORMESSGES.TASKREQUIRED;
  taskExistsError = AppConstants.ERRORMESSGES.TASKREQUIRED;

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.addTaskDataForm = this.fb.group({
      task: ['', Validators.required]
    });
  }

  get addTaskDataFormControl() {
    return this.addTaskDataForm.controls;
  }

  onSubmitAddTaskDataForm() {
    this.addTaskDataFormResponse = this.addTaskDataForm.getRawValue();
    if (this.parentData.list.indexOf(this.addTaskDataFormResponse.task) > -1) {
      this.showErrorTaskExist = true;
    }
    if (!this.showErrorTaskExist) {
      this.closeModalWithData();
    }
  }

  removeCustomError() {
    this.showErrorTaskExist = false;
  }

  closeModalWithData() {
    this.addTaskDataFormResponse = this.addTaskDataForm.getRawValue();
    this.sendData = {
      task: this.addTaskDataFormResponse.task,
      isError: this.showErrorTaskExist || this.clickCancel
    }

    console.log("sendData =", this.sendData)
    this.activeModal.close(this.sendData);
    //this.addTaskDataForm.controls['task'].reset();
  }


  closeModal() {
    this.clickCancel = true;
    this.closeModalWithData();
    //this.addTaskDataForm.controls['task'].reset();
  }


}

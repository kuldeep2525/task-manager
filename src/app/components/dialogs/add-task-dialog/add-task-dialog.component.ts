import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from '../../../constants/app.constants';
import { NGXLogger } from 'ngx-logger';

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

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder, private logger: NGXLogger) {
    this.logger.debug('Loaded Add-task-dialog');
  }

  ngOnInit() {
    this.addTaskDataForm = this.fb.group({
      task: ['', Validators.required]
    });
  }

  /**
   * get Form controls for addTaskDataForm
   */
  get addTaskDataFormControl() {
    return this.addTaskDataForm.controls;
  }

  /**
   * Submit addTaskData Form
   */
  onSubmitAddTaskDataForm() {
    this.logger.debug('Inside Add-task-dialog onSubmitAddTaskDataForm()');
    this.addTaskDataFormResponse = this.addTaskDataForm.getRawValue();
    if (this.parentData.list.indexOf(this.addTaskDataFormResponse.task) > -1) {
      this.showErrorTaskExist = true;
    }
    if (!this.showErrorTaskExist) {
      this.closeModalWithData();
    }
  }

  /**
  * Remove Custom Error
  */
  removeCustomError() {
    this.showErrorTaskExist = false;
  }

  /**
  * Close Modal With Data (task data returning from modal)
  */
  closeModalWithData() {
    this.logger.debug('Inside Add-task-dialog closeModalWithData()');
    this.addTaskDataFormResponse = this.addTaskDataForm.getRawValue();
    this.sendData = {
      task: this.addTaskDataFormResponse.task,
      isError: this.showErrorTaskExist || this.clickCancel
    }
    this.logger.info('Data send by addTaskData Form', this.sendData);
    this.activeModal.close(this.sendData);
  }

  /**
  * Close Modalon click close or cancel button
  */
  closeModal() {
    this.logger.debug('Inside Add-task-dialog closeModal()');
    this.clickCancel = true;
    this.closeModalWithData();
  }

}

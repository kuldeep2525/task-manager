import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { AppConstants } from '../../../constants/app.constants';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class ConfirmationDialogService {

  constructor(private modalService: NgbModal, private logger: NGXLogger) {
    this.logger.debug('Loaded ConfirmationDialog Service');
  }

  /**
  * Set data in confrim dialog 
  */
  public confirm(
    title: string,
    message: string,
    btnOkText: string = AppConstants.BUTTONS.OK,
    btnCancelText: string = AppConstants.BUTTONS.CANCEL,
    dialogSize: 'sm' | 'lg' = 'lg'): Promise<boolean> {
    this.logger.debug('Loaded ConfirmationDialog confirm()');

    const saveDataModalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
    saveDataModalRef.componentInstance.title = title;
    saveDataModalRef.componentInstance.message = message;
    saveDataModalRef.componentInstance.btnOkText = btnOkText;
    saveDataModalRef.componentInstance.btnCancelText = btnCancelText;

    return saveDataModalRef.result;
  }

}

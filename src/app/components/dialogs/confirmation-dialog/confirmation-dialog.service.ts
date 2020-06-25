import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { AppConstants } from '../../../constants/app.constants';

@Injectable()
export class ConfirmationDialogService {

  constructor(private modalService: NgbModal) {

  }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = AppConstants.BUTTONS.OK,
    btnCancelText: string = AppConstants.BUTTONS.CANCEL,
    dialogSize: 'sm' | 'lg' = 'lg'): Promise<boolean> {
    const saveDataModalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
    saveDataModalRef.componentInstance.title = title;
    saveDataModalRef.componentInstance.message = message;
    saveDataModalRef.componentInstance.btnOkText = btnOkText;
    saveDataModalRef.componentInstance.btnCancelText = btnCancelText;

    return saveDataModalRef.result;
  }

}

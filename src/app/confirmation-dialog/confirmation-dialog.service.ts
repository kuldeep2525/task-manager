import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable()
export class ConfirmationDialogService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const saveDataModalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
    saveDataModalRef.componentInstance.title = title;
    saveDataModalRef.componentInstance.message = message;
    saveDataModalRef.componentInstance.btnOkText = btnOkText;
    saveDataModalRef.componentInstance.btnCancelText = btnCancelText;

    return saveDataModalRef.result;
  }

}

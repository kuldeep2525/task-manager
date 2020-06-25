import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(private activeModal: NgbActiveModal, private logger: NGXLogger) {
    this.logger.debug('Loaded ConfirmationDialog Component');
  }

  ngOnInit() {

  }

  /**
   * User decline to delete task
   */
  public decline() {
    this.logger.debug('Inside ConfirmationDialog Component decline()');
    this.activeModal.close(false);
  }

  /**
  * User accept to delete task
  */
  public accept() {
    this.logger.debug('Inside ConfirmationDialog Component accept()');
    this.activeModal.close(true);
  }

  /**
  * User close dialog
  */
  public dismiss() {
    this.logger.debug('Inside ConfirmationDialog Component dismiss()');
    this.activeModal.dismiss();
  }

}

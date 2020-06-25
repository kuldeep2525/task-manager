import { Injectable } from '@angular/core';
import { AppState } from '../../state/app.state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  SetTodoAction,
  SetInProgressAction,
  SetDoneAction
} from '../../state/app.action';

@Injectable({
  providedIn: 'root'
})

export class HomeFacade {
  constructor(
    private store: Store<AppState>,
  ) {

  }

  /**
    * get state of app
    */
  public getAppState(): Observable<any> {
    return this.store.pipe(select((state: any) => state));
  }

  /**
    * set state of Todo list
    */
  public setTodoState(todoList) {
    if (todoList) {
      this.store.dispatch(
        new SetTodoAction({
          todoList: todoList
        }
        )
      );
    }
  }

  /**
    * set state of Inprogress List
    */
  public setInprogressState(inprogressList) {
    if (inprogressList) {
      this.store.dispatch(
        new SetInProgressAction({
          inProgressList: inprogressList
        }
        )
      );
    }
  }

  /**
    * set state of Done list
    */
  public setDoneState(doneList) {
    if (doneList) {
      this.store.dispatch(
        new SetDoneAction({
          doneList: doneList
        }
        )
      );
    }
  }

}

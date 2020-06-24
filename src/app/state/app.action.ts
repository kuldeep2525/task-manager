import { Action } from '@ngrx/store';
import { Task } from '../models/task.model';

export enum TaskActionTypes {
  SETTODO = '[Task] SetTodo',
  SETINPROGRESS = '[Task] SetInProgress',
  SETDONE = '[Task] SetDone',
}

export class SetTodoAction implements Action {
  readonly type = TaskActionTypes.SETTODO;
  constructor(public payload: Task) {
  }
}

export class SetInProgressAction implements Action {
  readonly type = TaskActionTypes.SETINPROGRESS;
  constructor(public payload: Task) {
  }
}

export class SetDoneAction implements Action {
  readonly type = TaskActionTypes.SETDONE;
  constructor(public payload: Task) {
  }
}

export type TaskActions = SetTodoAction | SetInProgressAction | SetDoneAction;
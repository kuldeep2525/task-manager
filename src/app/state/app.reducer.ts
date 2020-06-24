import { combineReducers } from '@ngrx/store';
import { tassign } from 'tassign';
import { Task } from '../models/task.model';
import {
  TaskActions,
  TaskActionTypes
} from './app.action';


const initialTaskState: Task = { todoList: [], inProgressList: [], doneList: [] };

export function taskReducer(state = initialTaskState, action: TaskActions): Task {
  switch (action.type) {
    case TaskActionTypes.SETTODO:
      return tassign(state, action.payload);
    case TaskActionTypes.SETINPROGRESS:
      return tassign(state, action.payload);
    case TaskActionTypes.SETDONE:
      return tassign(state, action.payload);
    default:
      return state;
  }
}

const reducers = {
  task: taskReducer
};

export function AppReducer(state: any, action: any) {
  return combineReducers(reducers);
}

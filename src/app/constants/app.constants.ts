import { Injectable } from '@angular/core';

@Injectable()
export class AppConstants {
    /**
  * LABLES
  */
    public static LABLES = class {
        public static APPNAME = 'Task Manager';
        public static TODOLIST = 'TODO';
        public static INPRGOGRESSLIST = 'IN PROGRESS';
        public static DONELIST = 'DONE';
        public static ADDTASK = 'Add New Task';
        public static ENTERTASK = 'Enter Task';
        public static ADDCARD = '+ Add Card';
        public static ADDANOTHERCARD = '+ Add a Another Card';
        public static CONFIRM = 'Confirm';
    }

    /**
      * BUTTONS
      */
    public static BUTTONS = class {
        public static OK = 'Ok';
        public static CANCEL = 'Cancel';
        public static CLOSE = 'Close';
        public static SAVE = 'Save';
    }

    /**
     * MESSEGES
     */
    public static MESSEGES = class {
        public static CONFIRMTASK = 'Do you really want to delete task ?';
    }

    /**
   * ERROR MESSGES
   */
    public static ERRORMESSGES = class {
        public static TASKREQUIRED = 'Task is required';
        public static TASKEXISTS = 'Task already Exists';
    }

}



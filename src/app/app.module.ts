//MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {StoreModule} from '@ngrx/store';

//COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';


//SERVICES
import { ConfirmationDialogService } from './components/confirmation-dialog/confirmation-dialog.service';

// REDUSER
import {
  taskReducer
} from './state/app.reducer';
import { ListComponent } from './components/home/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmationDialogComponent,
    AddTaskDialogComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    StoreModule.forRoot({
      task: taskReducer
    }),
  ],
  providers: [ConfirmationDialogService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent,AddTaskDialogComponent]
})
export class AppModule { }

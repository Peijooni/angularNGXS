import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { IndexComponent } from './components/index/index.component';
import { EditPractiseComponent } from './components/dialogs/edit-practise/edit-practise.component';
import appRoutes from './routerConfig';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PractiseState } from './state/practise.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { CompoundComponent } from './components/compound/compound.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    IndexComponent,
    EditPractiseComponent,
    LoginComponent,
    CompoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([
      PractiseState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    EditPractiseComponent
 ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { CompoundComponent } from './components/compound/compound.component';

const appRoutes: Routes = [
  { path: 'testi',
    component: LoginComponent
  },
  {
    path: 'app',
    component: CompoundComponent
  }
];

export default appRoutes;

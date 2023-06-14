import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutRoutes } from './layout.routing';
import { NbMenuModule } from '@nebular/theme';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    NbMenuModule
  ]
})
export class LayoutModule { }

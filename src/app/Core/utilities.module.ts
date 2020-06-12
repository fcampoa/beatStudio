import { QuickAppProMaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderComponent } from './utilities/loader/loader.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppViewComponent } from './utilities/app-view/app-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    QuickAppProMaterialModule
  ],
  declarations: [
    AppViewComponent,
    LoaderComponent
  ],
  exports: [
    AppViewComponent,
    LoaderComponent
  ]
})

export class UtilitiesModule { }

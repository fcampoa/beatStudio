import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderComponent } from './utilities/loader/loader.component';

import { ReportViewerComponent } from './utilities/report-viewer/report-viewer.component';
import { AppHeaderComponent } from './utilities/app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './utilities/task-card/task-card.component';
import { NgModule } from '@angular/core';
import { AppViewComponent } from './utilities/app-view/app-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [
    TaskCardComponent,
    AppViewComponent,
    AppHeaderComponent,
    ReportViewerComponent,
    LoaderComponent
  ],
  exports: [
    TaskCardComponent,
    AppViewComponent,
    AppHeaderComponent,
    ReportViewerComponent,
    LoaderComponent
  ]
})

export class UtilitiesModule { }

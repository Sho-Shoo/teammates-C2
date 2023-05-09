import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DynamicModule } from 'ng-dynamic-component';
import {
  ContributionQuestionStatisticsModule,
} from '../question-types/question-statistics/contribution-question-statistics/contribution-question-statistics.module';
import { SortableTableComponent, SafeHtmlPipe } from './sortable-table.component';

/**
 * Module for displaying data in a sortable table
 */
@NgModule({
  declarations: [
    SortableTableComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
    ContributionQuestionStatisticsModule,
    DynamicModule,
  ],
  exports: [
    SortableTableComponent,
  ],
})
export class SortableTableModule { }

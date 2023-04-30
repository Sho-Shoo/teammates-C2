import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { SimpleModalService } from '../../../../services/simple-modal.service';
import { Notification } from '../../../../types/api-output';
import { SortBy, SortOrder } from '../../../../types/sort-properties';
import { SimpleModalType } from '../../../components/simple-modal/simple-modal-type';
import { NotificationsTableHeaderColorScheme, NotificationsTableRowModel } from './notifications-table-model';
import { ColumnData, SortableTableCellData } from '../../../components/sortable-table/sortable-table.component'

@Component({
  selector: 'tm-notifications-table',
  templateUrl: './notifications-table.component.html',
  styleUrls: ['./notifications-table.component.scss'],
})
export class NotificationsTableComponent 
  implements OnInit, OnChanges {
  SortBy = SortBy;
  SortOrder = SortOrder;
  NotificationsTableHeaderColorScheme = NotificationsTableHeaderColorScheme;

  @Input()
  guessTimezone = 'UTC';

  @Input()
  notificationsTableRowModels: NotificationsTableRowModel[] = [];

  @Input()
  notificationsTableRowModelsSortBy = SortBy.NOTIFICATION_CREATE_TIME;

  @Input()
  notificationsTableRowModelsSortOrder = SortOrder.DESC;

  @Input()
  headerColorScheme = NotificationsTableHeaderColorScheme.BLUE;

  @Output()
  sortNotificationsTableRowModelsEvent: EventEmitter<SortBy> = new EventEmitter();

  @Output()
  deleteNotificationEvent: EventEmitter<String> = new EventEmitter();

  @Output()
  loadNotificationEditFormEvent: EventEmitter<Notification> = new EventEmitter();

  constructor(private simpleModalService: SimpleModalService) { }

  columnsData: ColumnData[] = [];
  rowsData: SortableTableCellData[][] = [];

  ngOnInit(): void {
    this.getTableData();
  }

  ngOnChanges(): void {
    this.getTableData();
  }

  private getTableData(): void {
    this.columnsData = [
      { header: 'Title', sortBy: SortBy.NOTIFICATION_TITLE },
      { header: 'Start Time', sortBy: SortBy.NOTIFICATION_START_TIME },
      { header: 'End Time', sortBy: SortBy.NOTIFICATION_END_TIME },
      { header: 'Target User', sortBy: SortBy.NOTIFICATION_TARGET_USER },
      { header: 'Style', sortBy: SortBy.NOTIFICATION_STYLE },
      { header: 'Creation Time', sortBy: SortBy.NOTIFICATION_CREATE_TIME },
    ];

    this.rowsData = [];
    for (const row of this.notificationsTableRowModels) {
      const notification = row.notification;
      this.rowsData.push([
        { value: notification.title },
        { value: notification.startTimestamp },
        { value: notification.endTimestamp },
        { value: notification.targetUser },
        { value: notification.style },
        { value: notification.createdAt },
      ])
    }
  }

  /**
   * Sorts the list of feedback session row.
   */
  sortNotificationsTableRowModels(by: SortBy): void {
    this.sortNotificationsTableRowModelsEvent.emit(by);
  }

  getAriaSort(by: SortBy): String {
    if (by !== this.notificationsTableRowModelsSortBy) {
      return 'none';
    }
    return this.notificationsTableRowModelsSortOrder === SortOrder.ASC ? 'ascending' : 'descending';
  }

  /**
   * Deletes a notification based on its ID.
   */
  deleteNotification(notificationId: string, title: string): void {
    const modalRef = this.simpleModalService.openConfirmationModal(
      'Confirm your action',
      SimpleModalType.DANGER,
      `Do you want to delete this notification (titled "${title}") permanently? This action will not be reversible.`,
    );
    modalRef.result.then(() => this.deleteNotificationEvent.emit(notificationId));
  }

  /**
   * Loads the notification edit form.
   */
  loadNotificationEditForm(notification: Notification): void {
    this.loadNotificationEditFormEvent.emit(notification);
  }
}

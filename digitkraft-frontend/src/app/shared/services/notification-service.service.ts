import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  showNotification(
    from: NotificationVerticalPosition,
    align: NotificationHorizontalPosition,
    message: string,
    type: NotificationTypes
  ) {
    ($ as any).notify(
      {
        icon: "pe-7s-bell",
        message: message,
      },
      {
        type: type,
        timer: 1000,
        placement: {
          from: from,
          align: align,
        },
      }
    );
  }
}

export enum NotificationTypes {
  Info = "info",
  Success = "success",
  Warning = "warning",
  Danger = "danger",
  Empty = "",
}

export enum NotificationVerticalPosition {
  Top = "top",
  Bottom = "bottom",
}

export enum NotificationHorizontalPosition {
  Left = "left",
  Right = "right",
  Center = "center",
}

import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { SnackbarComponent } from '../modules/layout/ng-material/snack-bar/snack-bar.component';
import { coerceToArray } from '../_utils/coerceToArray';
@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackbar: MatSnackBar, private zone: NgZone) {}

  error(message: string): void {
    this.show({
      panelClass: ['snackbar-container', 'error'],
      data: { message: message, icon: 'error' },
    });
  }

  success(message: string): void {
    this.show({
      panelClass: ['snackbar-container', 'success'],
      data: { message: message, icon: 'done' },
    });
  }

  warning(message: string): void {
    this.show({
      panelClass: ['snackbar-container', 'warning'],
      data: { message: message, icon: 'warning' },
    });
  }

  private show(customConfig: MatSnackBarConfig = {}): void {
    const customClasses = coerceToArray(customConfig.panelClass).filter(
      (v) => typeof v === 'string'
    ) as string[];

    this.zone.run(() => {
      this.snackbar.openFromComponent(SnackbarComponent, {
        ...customConfig,
        panelClass: ['snackbar-container', ...customClasses],
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/common/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  /* constructor(private snackBar: MatSnackBar) {}

  show(message: string, duration: number = 2000) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: { message },
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  } */
}

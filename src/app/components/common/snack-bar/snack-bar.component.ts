import { Component, Inject, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  imports: [MatSnackBarModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
})
export class SnackBarComponent {
  //@Inject(MAT_SNACK_BAR_DATA) snackBarData: any;
  /* constructor(private snackBarRef: MatSnackBarRef<SnackBarComponent>) {}
  close() {
    this.snackBarRef.dismiss();
  } */
}

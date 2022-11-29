import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, action: any) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['blue-snackbar'],
    });
  }
}

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly location: Location
  ) {}

  openSnack(message: string, action: any) {
    this._snackBar.open(message, action, { duration: 2000 });
    this.location.back();
  }
}

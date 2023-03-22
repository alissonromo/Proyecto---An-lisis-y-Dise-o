import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  Mensaje: any;
}

@Component({
  selector: 'app-notificacion-dialog',
  templateUrl: './notificacion-dialog.component.html',
  styleUrls: ['./notificacion-dialog.component.css']
})
export class NotificacionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NotificacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}

import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FeedbackService } from './feedback.service';

export interface DialogData {
  email: string;
  feedback: string;
}


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

  constructor(public dialog: MatDialog, private fbService: FeedbackService) { }

  email:string;
  feedback: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackDialog, {
      // width: '400px',
      data: {email: this.email, feedback: this.feedback}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
      this.fbService.openSnackBar('Thanks for your feedback', 'OK', {duration: 3000, panelClass: ['white-snackbar']});
    });
  }


}


@Component({
  selector: 'feedback-dialog',
  templateUrl: './feedback-dialog.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackDialog {

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
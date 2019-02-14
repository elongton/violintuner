import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FeedbackService } from './feedback.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(public dialog: MatDialog, private fbService: FeedbackService,) { }

  email:string = 'yes';
  feedback: string = 'maaam';

  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackDialog, {
      // width: '400px',
      data: {email: this.email, feedback: this.feedback}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
      this.fbService.setLocalFields(this.email, this.feedback);
    });
  }


}


@Component({
  selector: 'feedback-dialog',
  templateUrl: './feedback-dialog.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fbService: FeedbackService) {}


    feedbackForm: FormGroup;
    feedbackObject: {email: string, feedback: string}

    ngOnInit(){
      let localFields = this.fbService.getLocalFields();
      console.log(localFields.email)
      console.log(localFields.feedback)
      this.feedbackForm = new FormGroup({
        'email': new FormControl(localFields.email),
        'feedback': new FormControl(localFields.feedback, Validators.required),
      }) 
    }

    onSubmit(){
      let feedbackForm = this.feedbackForm;
      this.feedbackObject = {
        email: feedbackForm.value.email,
        feedback: feedbackForm.value.feedback,
      }

      this.fbService.openSnackBar('Thanks for your feedback', 'OK', {duration: 3000, panelClass: ['white-snackbar']});
      this.dialogRef.close();
    }


  onNoClick(): void {
    console.log(this.feedbackForm.value.email)
    this.fbService.setLocalFields(this.feedbackForm.value.email, this.feedbackForm.value.feedback);
    this.dialogRef.close();
  }

}
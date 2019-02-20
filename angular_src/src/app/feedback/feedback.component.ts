import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTooltip} from '@angular/material';
import { FeedbackService } from './feedback.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {TooltipPosition} from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

export interface DialogData {
  email: string;
  feedback: string;
}


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private fbService: FeedbackService,
              private cookie: CookieService) { }

  email:string = 'email data';
  feedback: string = 'feedback data';
  @ViewChild('tooltip') tooltip: MatTooltip;

  //tooltip
  position = 'after';

  ngOnInit(){
    if(!this.cookie.get('feedback_suggestion')){
      setTimeout(()=>{
        this.tooltip.show();
        this.fbService.openSnackBar('Please help us improve this app by providing feedback', 'Sure thing', {duration: 7000});
        this.cookie.set('feedback_suggestion', 'true');
        setTimeout(()=>{this.tooltip.hide()}, 7200)
      }, 500)
    }

  }



  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackDialog, {
      panelClass: 'feedbackDialog',
      autoFocus: true,
      data: {email: this.email, feedback: this.feedback},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
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
      this.feedbackForm = new FormGroup({
        'email': new FormControl(this.fbService.email, Validators.email),
        'feedback': new FormControl(this.fbService.feedback, Validators.required),
      }) 
      // console.log(this.feedbackForm)
    }
    onSubmit(){
      this.feedbackObject = {
        email: this.feedbackForm.value.email,
        feedback: this.feedbackForm.value.feedback,
      }

      this.fbService.sendFeedback(this.feedbackObject);
      this.fbService.openSnackBar('Thanks for your feedback', 'Anytime!', {duration: 3000, panelClass: ['white-snackbar']});
      this.dialogRef.close();
    }

    onCancelClick():void{
        this.fbService.setLocalFields(this.feedbackForm.value.email, this.feedbackForm.value.feedback);
        this.dialogRef.close();
    }


}
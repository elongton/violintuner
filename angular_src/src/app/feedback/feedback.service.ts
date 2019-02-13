import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class FeedbackService{

    constructor(private snackBar: MatSnackBar){}

    email: string;
    feedback: string;

    openSnackBar(message: string, action: string, properties: any) {
        this.snackBar.open(message, action, properties);
    }//openSnackBar


}
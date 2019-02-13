import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Feedback{
    email: string,
    feedback: string
}

const postFeedbackURL = 'domain/feedback';



@Injectable()
export class FeedbackService{

    constructor(private snackBar: MatSnackBar, private http: HttpClient,){}

    email: string;
    feedback: string;

    openSnackBar(message: string, action: string, properties: any) {
        this.snackBar.open(message, action, properties);
    }//openSnackBar


    sendFeedback(content:Feedback){
        return this.http.post(postFeedbackURL, content)
    }
    getFeedback(){
        return this.http.get(postFeedbackURL)
    }


}
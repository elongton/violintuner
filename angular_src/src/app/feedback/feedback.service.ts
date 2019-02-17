import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';


interface Feedback{
    email: string,
    feedback: string
}

const postFeedbackURL = 'domain/feedback/post';
const getFeedbackURL = 'domain/feedback/get';



@Injectable()
export class FeedbackService{

    constructor(private snackBar: MatSnackBar, private http: HttpClient, private db: AngularFirestore){}

    public email: string = '';
    public feedback: string = '';

    openSnackBar(message: string, action: string, properties: any) {
        this.snackBar.open(message, action, properties);
    }//openSnackBar

    setLocalFields(email: string, feedback: string){
        this.email = email;
        this.feedback = feedback;
    }

    sendFeedback(content:Feedback){
        this.db.collection('feedback').add(content)
    }
    getFeedback(){
        this.db.collection('feedback').valueChanges().subscribe(result=> console.log(result))
    }

 


}
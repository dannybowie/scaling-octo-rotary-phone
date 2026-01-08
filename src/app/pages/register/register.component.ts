import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private firestore = inject(Firestore);
  submissionSuccess = false;

onSubmit(form: NgForm) {
  if (form.valid) {
    const { fName, lName, email, phone, dob, religion, church, baptized } = form.value;
      
      const usersCollection = collection(this.firestore, 'registrations');
      interface UserData {
        fName: string;
        lName: string;
        email: string;
        phone: string;
        dob: Date;
        church: string;
        baptized: string;
        religion: string;
      }

      addDoc(usersCollection, { 
        fName, 
        lName, 
        email, 
        phone, 
        dob: new Date(dob), 
        religion, 
        church, 
        baptized 
      } as UserData).then(() => {
        console.log('Form Submitted to Firebase');
        this.submissionSuccess = true;
        setTimeout(() => {
          this.submissionSuccess = false;
        } , 5000)
        form.resetForm();
      }).catch((error: Error) => {
        console.error('Error adding document: ', error);
      });
  }
}
}
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private firestore = inject(Firestore);

onSubmit(form: NgForm) {
  if (form.valid) {
    const { fName, lName, email, religion } = form.value;
      
      const usersCollection = collection(this.firestore, 'users');
      interface UserData {
        fName: string;
        lName: string;
        email: string;
        religion: string;
      }

      addDoc(usersCollection, { fName, lName, email, religion } as UserData).then(() => {
        console.log('Form Submitted to Firebase');
        form.resetForm();
      }).catch((error: Error) => {
        console.error('Error adding document: ', error);
      });
  }
}
}
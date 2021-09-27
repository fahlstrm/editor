import { Component, OnInit  } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  existing: boolean = true;
  buttonText: string = 'Skapa ny användare';
  h2: string = 'Logga in för att åtkomst av dokument';
  constructor(private formBuilder: FormBuilder) {

   }

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  
  newUsername = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  newPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  rights = new FormControl('', [Validators.required]);
  
  loginForm: FormGroup = this.formBuilder.group({
    username: this.username,
    password: this.password
  });

  createForm: FormGroup = this.formBuilder.group({
    newUsername: this.newUsername,
    newPassword: this.newPassword,
    rights: this.rights
  });


  ngOnInit(): void {
  }


  createNewUser() {
    this.existing = false;
    this.buttonText = 'Tillbaka till Logga in'; 
    this.h2 = 'Skapa användare för åtkomst av dokument';
  }

  returnLogin() {
    this.existing = true;
    this.buttonText = 'Skapa ny användare';
    this.h2 = 'Logga in för att åtkomst av dokument';
  }

  loginUser() {
    console.log(this.loginForm.value);
    // this.loginForm.reset();
  }

  createUser() {
    console.log(this.createForm.value)
    this.createForm.reset();

  }


}

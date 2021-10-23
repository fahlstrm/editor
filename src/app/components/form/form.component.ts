import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  existing: boolean = true;
  buttonText: string = 'Skapa ny användare';
  h2: string = 'Logga in för att åtkomst av dokument';
  url = "https://jsramverk-editor-frah20.azurewebsites.net";
  // url = "http://localhost:3000";
  err: string = ``; 
  urlId: any = false;

  
  @Output() auth = new EventEmitter<any>();


  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient) {
     
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
  
  loginForm: FormGroup = this.formBuilder.group({
    username: this.username,
    password: this.password
  });

  createForm: FormGroup = this.formBuilder.group({
    newUsername: this.newUsername,
    newPassword: this.newPassword
  });


  ngOnInit(): void {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('id')) {
      this.urlId = urlParams.get('id');
      this.createNewUser();
    }
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
    this.err = ``;
    let body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }

    this.http.post(`${this.url}/users/login`, body).subscribe((res: any) => 
      {
        if (res.data.result.err) {
          this.err = res.data.result.err;
        } else {
          this.auth.emit(res.data.result);
        }
      })
    this.loginForm.reset();
  }

  createUser() {
    let body = {
      username: this.createForm.value.newUsername,
      password: this.createForm.value.newPassword,
      urlId: this.urlId,
    }

    this.http.post(`${this.url}/users/create`, body).subscribe((res: any)=> 
    {
      if (res.data.id) {
        console.log(res.data.result)
        this.auth.emit(res.data.result);
      }
    })
    this.createForm.reset();
  }


}

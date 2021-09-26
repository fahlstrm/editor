import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  existing: boolean = true;
  buttonText: string = (this.existing == true) ? 'Skapa ny användare' : 'Tillbaka till Logga in';

  constructor() { }

  ngOnInit(): void {
  }
  
  createNewUser() {
    this.existing = false;
  }

  returnLogin() {
    this.existing = true;
  }

}

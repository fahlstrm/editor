import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'real time collaborative document editor';

  constructor() { }

  content:string = ``;
  documentId:string = ``;
  docToEdit:string = ``;


  // @Output() docToEdit = new EventEmitter<any>();


  getContent(content : any) {
    this.content = content;
  }

  getCollectedDoc(collectedDoc : any) {
    console.log(collectedDoc)
    this.docToEdit = collectedDoc;
  }

  getId(id : any) {
    this.documentId = id;
  }
}

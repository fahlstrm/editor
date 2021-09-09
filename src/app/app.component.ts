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
  resetEditor:string = ``;
  updateDocs:string = ``;


  // @Output() docToEdit = new EventEmitter<any>();
  getResetDoc(reset: any) {
    this.resetEditor = reset;
  }

  getUpdatedDocs(event: any) {
    this.updateDocs = event;
  }

  getContent(content : any) {
    this.content = content;
  }

  getCollectedDoc(collectedDoc : any) {
    this.docToEdit = collectedDoc;
  }

  getId(id : any) {
    this.documentId = id;
  }
}

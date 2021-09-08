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
  // docToEdit: any = {};
  @Output() docToEdit = new EventEmitter<object>();


  getContent(content : any) {
    this.content = content;
  }

  getCollectedDoc(collectedDoc : any) {
    // this.docToEdit = collectedDoc;
    console.log(collectedDoc)
    this.docToEdit.emit(collectedDoc);
  }

  getId(id : any) {
    this.documentId = id;
  }
}

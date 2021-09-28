import { Component, Output, EventEmitter } from '@angular/core';

// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:1337";

// const socket = socketIOClient(ENDPOINT);

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
  auth: boolean = false;
  token: any = null;
  user: object = {};


  // @Output() docToEdit = new EventEmitter<any>();
  getResetDoc(reset: any) {
    this.resetEditor = reset;
    console.log(this.resetEditor)
  }

  getUpdatedDocs(event: any) {
    console.log(event)
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

  getAuth(auth: any) {
    this.token = auth.token;
    this.user = auth;
    this.auth = true;
  }
}

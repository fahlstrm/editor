import { Component, Output, EventEmitter } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

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
  reset:string = ``;
  updateDocs:string = ``;
  auth: boolean = false;
  token: any = null;
  // headers: any = this.httpOptions;
  user: object = {
    // user: {
    //   username: "frida"
    // }
  };

  // @Output() docToEdit = new EventEmitter<any>();
  resetAll(reset: any) {
    this.reset = reset;
    console.log(this.reset)
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

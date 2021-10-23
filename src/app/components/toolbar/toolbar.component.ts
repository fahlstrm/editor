import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],

})
export class ToolbarComponent implements OnInit {
  infotext: string = `Dokumenten sparas automatiskt.   `;
  pdfButton: string ="Skapa PDF";
  codeButton: string ="Kör kod";
  editorButton: string = 'Code-mode';

  typeEditor: string = 'doc';

  url = "https://jsramverk-editor-frah20.azurewebsites.net";
  // url = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  @Input() documentId: any;
  @Input() token: any;
  @Input() content: any;

  @Output() type = new EventEmitter<any>();


  ngOnInit(): void {
  }

  codeEditor() {
    this.type.emit("code");
    this.editorButton = "Doc-mode"
    this.typeEditor = "code"
    this.documentId = null;
  }

  regEditor() {
    this.type.emit("doc");
    this.editorButton = "Code-mode"
    this.typeEditor = "doc"
    this.documentId = null;
  } 

  //Run code against API
  async runCode() {
    const headers = {
      'content-type': 'application/json'
    }

    let body = {
      code: btoa(this.content)
    }

    await this.http.post(`https://execjs.emilfolino.se/code`, body, {headers}).subscribe((res: any)=> 
    {
      let decodedOutput = atob(res.data);
      console.log(decodedOutput); 
    }, e => {
      console.log("error", e)
    })
  
   }


  async createPdf() {
    const headers = new HttpHeaders({
      'Accept': 'pdf',
      "repsonseType" : "blob",
      'x-access-token': this.token
   });
  
    let body = {
      id: this.documentId,
    }
     
    await this.http.post(`${this.url}/documents/pdf`, body, {headers}).subscribe((res: any)=> 
        {
          let arr = new Uint8Array(res.data);
          let file = new Blob([arr], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        }, e => {
          console.log("error", e)
        })
  }
}

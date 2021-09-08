import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],

})
export class ToolbarComponent implements OnInit {
  buttonText: string = 'Spara';
  buttonTex: string = 'Öppna';

  constructor(private http:HttpClient) { }

  url = "https://jsramverk-editor-frah20.azurewebsites.net";
  document: any = [];

  @Input() content: string =``;
  @Input() documentId: string =``;
  @Input() docToEdit: any = {};

  @Output() collectedDoc = new EventEmitter<any>();


  ngOnInit(): void {
  }

  saveContent() {
    console.log(this.docToEdit)
    console.log(this.content);
    const body = this.content;
    this.postContent(body);
  }

  postContent(body: string) {
    console.log(body)
    return this.http.post(`${this.url}/save/${this.docToEdit.data._id}`, body);
  }

  async openContent() {
    await this.getDocument(this.documentId);
  }


  getDocument(id : string) {
    this.http.get(`${this.url}/documents/${id}`).subscribe(res=> 
      {
        this.document = res;
        this.collectedDoc.emit(this.document);
      })
  }


}

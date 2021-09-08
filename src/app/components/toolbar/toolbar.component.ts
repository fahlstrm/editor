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

  url = "https://jsramverk-editor-frah20.azurewebsites.net/documents";
  document: any = [];

  @Input() content: string =``;
  @Input() documentId: string =``;

  @Output() collectedDoc = new EventEmitter<object>();


  ngOnInit(): void {
  }

  saveContent() {
    console.log(this.content);
  }

  async openContent() {
    let test = await this.getDocument(this.documentId);
    console.log(this.document.length)

    this.collectedDoc.emit(this.document);
    
  }

  getDocument(id : string) {
    // console.log(id)
    this.http.get(`${this.url}/${id}`).subscribe(res=> 
      {
        // console.log(res)
        this.document = res
        console.log((this.document))
      })
    //   // console.log(this.document)
    return this.document
  }


}

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
  url = "https://jsramverk-editor-frah20.azurewebsites.net";
  document: any = [];

  constructor(private http:HttpClient) { }

  @Input() content: string =``;
  @Input() docToEdit: any = {};

  @Output() resetEditor = new EventEmitter<any>();

  ngOnInit(): void {
  }

  saveContent() {
    const body: any = {
      text: this.content
    }

    if (!this.docToEdit) {
      this.postContent("0", body)
    } else {
      this.postContent(this.docToEdit.data._id, body);
    }
  }

  postContent(id: string, body: string) {
    console.log(id)
    this.http.post(`${this.url}/save/${id}`, body).subscribe(res=> 
      {
        this.resetEditor.emit(this.document);
      })
  }
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],

})
export class ToolbarComponent implements OnInit {
  infotext: string = `Dokumenten sparas automatiskt.
  Om du skapar ett nytt dokument måste andra användare ladda om sidan för att det nya dokumentet skall synas
   `;
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
    console.log(this.docToEdit)

    if (Object.keys(this.docToEdit).length === 0) {
      this.postContent("0", body)
    } else {
      this.postContent(this.docToEdit.data._id, body);
    }
  }

  postContent(id: string, body: string) {
    console.log(id)
    this.http.post(`${this.url}/save/${id}`, body).subscribe(res=> 
      {
        console.log(this.docToEdit)
        this.docToEdit = {};
        this.resetEditor.emit(this.docToEdit);
      })
  }
}

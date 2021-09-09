import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  content: string = ``;
  edit: string = ``;
  // reset: string = ``;
  id: string = ``;
  url = "https://jsramverk-editor-frah20.azurewebsites.net";
  document: any = [];


  @Output() updated = new EventEmitter<string>();
  @Output() collectedDoc = new EventEmitter<any>();
  @Output() updateDocs = new EventEmitter<string>();

  // @Input() documentId: string =``;

  constructor(private http:HttpClient) { }

  //Get id from app
  get documentId(): any {
    return this.id;
  }

  //Trigger updateEditor once/if value is set. If a document is collected from db
  @Input('documentId') set documentId(value: any) {
    if (value) {
        this.id = value;
        this.updateEditor(this.id);
    }
  }

  @Input('resetEditor') set reset(value: any) {
    if (value) {
        this.resetEditor();
    }
  }


  async updateEditor(id: any) {
    await this.getDocument(id);
  }

  resetEditor() {
    this.content = ``; 
    this.updateDocs.emit("update");
  }

  getDocument(id : string) {
    this.http.get(`${this.url}/documents/${id}`).subscribe(res=> 
      {
        this.document = res;
        console.log(res);
        this.content = this.document.data.text;
        this.collectedDoc.emit(this.document);
      })
  }

  ngOnInit(): void {
  }

  onChanged(text: any) {
    this.updated.emit(text.html);
  }
}

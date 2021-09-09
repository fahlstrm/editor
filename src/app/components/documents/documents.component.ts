import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  url = "https://jsramverk-editor-frah20.azurewebsites.net/documents/all";
  documents: any = [];
 
  constructor(private http:HttpClient) { }

  @Output() documentId = new EventEmitter<string>();
  
  @Input('resetEditor') set resetEditor(value: any) {
    if (value) {
      console.log("he")
        // this.resetSelected();
    }
  }

  @Input('updateDocs') set updateDocs(value: any) {
    if (value) {
        this.getDocuments();
        console.log(this.documents)
    }
  }

  async ngOnInit() {
    await this.getDocuments();
  }

  async ngOnUpdate() {
    await this.getDocuments();
  }

  getDocuments() {
   this.http.get(this.url).subscribe(res=> 
      {
        this.documents = res;
      })
  }


  onSelected(event: any) {
    this.documentId.emit(event.target.id);
  }

  resetSelected() {
    this.documents.forEach((i :any) =>{
      i.isSelected=false;
    })

  }


    
}

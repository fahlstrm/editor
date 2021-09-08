import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  url = "https://jsramverk-editor-frah20.azurewebsites.net/documents/all";
  documents: any = [];
  // documents:Document[] = [];
  constructor(private http:HttpClient) { }

  @Output() documentId = new EventEmitter<string>();

  async ngOnInit() {
    await this.getDocuments();
  }

  getDocuments() {
    this.http.get(this.url).subscribe(res=> 
      {
        this.documents = res
      })
  }


  onSelected(event: any) {
    console.log(event.target)
    console.log(event.target.id)
    this.documentId.emit(event.target.id);
  }

    
}

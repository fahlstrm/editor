import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  baseUrl = "https://jsramverk-editor-frah20.azurewebsites.net";

  constructor() { }

  ngOnInit(): void {

  }

}

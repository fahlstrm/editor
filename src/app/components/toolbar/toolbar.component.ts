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
  // url = "https://jsramverk-editor-frah20.azurewebsites.net";
  document: any = [];

  constructor(private http:HttpClient) { }

  @Input() content: string =``;
  @Input() docToEdit: any = {};

  ngOnInit(): void {
  }


}

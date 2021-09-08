import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})



export class EditorComponent implements OnInit {
  content: string = ``;
  edit: string = ``;
  
  @Output() updated = new EventEmitter<string>();

  // @Input() docToEdit: object = {};

  constructor() { }

  updateEditor(event: any) {
    console.log("editor")
    console.log(event);
  }  

  ngOnInit(): void {
  }

  onChanged(text: any) {
    this.updated.emit(text.html);
  }
}

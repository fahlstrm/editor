import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})



export class EditorComponent implements OnInit {
  content: string = ``;
  edit: string = ``;
  // id: string = ``;
  
  @Output() updated = new EventEmitter<string>();
  // @Output() collectedId = new EventEmitter<string>();
  // @Input() docToEdit: object = {};

  constructor() { }

  //Get docToEdit from app
  get docToEdit(): any {
    return this.content;
  }

  //Trigger updateEditor once/if value is set. If a document is collected from db
  @Input('docToEdit') set docToEdit(value: any) {
    if (value) {
        this.content = value;
        this.updateEditor(this.content);
    }
}

  updateEditor(event: any) {
    this.content = event.data.text;
    // this.setID(event.data._id);
  }  

  // setID(docId: string) {
  //   this.id = docId;
  // }

  ngOnInit(): void {
  }

  onChanged(text: any) {
    this.updated.emit(text.html);
  }
}

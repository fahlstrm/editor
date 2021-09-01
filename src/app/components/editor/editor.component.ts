import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  content: string = ``;
  @Output() updated = new EventEmitter<string>();

 constructor() { }

  ngOnInit(): void {
  }

  onChanged(event: any) {
    this.updated.emit(event.text);
  }

}

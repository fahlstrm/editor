import { Component, Input, OnInit } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],

})
export class ToolbarComponent implements OnInit {
  buttonText: string = 'Spara';
  constructor() { }

  @Input() content: string =``;

  ngOnInit(): void {
  }

  saveContent() {
    console.log(this.content);
  }


}

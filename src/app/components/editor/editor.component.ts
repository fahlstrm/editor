import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from 'src/app/socket.service';
import { DomSanitizer } from '@angular/platform-browser'


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  content: any = ``;
  edit: string = ``;
  id: string = ``;
  url = "https://jsramverk-editor-frah20.azurewebsites.net";
  // url ="http://localhost:3000"
  document: any = [];
  type: string = `doc`;
  selected: any = null;

  @Output() updated = new EventEmitter<string>();
  @Output() collectedDoc = new EventEmitter<any>();
  @Output() comment = new EventEmitter<any>();
  


  constructor(
    private http:HttpClient,
    private sanitizer: DomSanitizer, 
    private socketService: SocketService) {}

  // //Get id from app
  // get documentId(): any {
  //   return this.id;
  // }

  @Input() user: any;
  @Input() token: any;
  @Input() docToEdit: any;

  // @Input('editor') set editor(value: any) {
  //   if (value) {
  //     console.log(value)
  //   }
  // }

  @Input('type') set typeEditor(value: any) {
    if (value) {
      this.document = [];
      this.type = value;
      this.content = null;
    }
  }

  //Trigger updateEditor once/if value is set. If a document is collected from db
  @Input('documentId') set documentId(value: any) {
    if (value) {
        this.id = value;
        this.updateEditor(this.id);
    }
  }

  @Input('reset') set reset(value: any) {
    if (value) {
        this.resetEditor();
    }
  }


  async updateEditor(id: any) {
    await this.getDocument(id);
  }

  resetEditor() {
    this.id=``;
    this.content = ``; 
    this.document=``;
  }


  selectionChanged(event: any) {
    let quill = event.editor;
    let range = quill.getSelection();
    if (range != null ) {
        let text = quill.getText(range.index, range.length);
        this.selected = text;
        let comment = {
          selected: this.selected,
          id: this.id,
          content: this.content,
        }
        this.comment.emit(comment);
    }
  }


  getDocument(id : string) {
    const headers = new HttpHeaders({ 'x-access-token': this.token});
    
    this.http.get(`${this.url}/documents/${id}`, {headers}).subscribe(( res: any)=> 
      {
        this.content = res.data.content;
        this.document = res;
        this.collectedDoc.emit(this.document);
        this.updated.emit(this.content);
      })
  }


  // Listen to the socket.io server
  ngOnInit(): void {
    this.socketService.getMessage('message').subscribe((data: any) => {
      this.content = data;
    });
  }

  onChanged(content: any) {
    this.content= content.html;
  }

  onKeyUp(content: any) {
    this.updated.emit(this.content);
    const body: any = {
      users: this.document.data.users,
      id: this.document.data._id,
      type: this.type,
      title: this.document.data.title,
      content: this.content,
      comments: this.docToEdit.comments
    }

    this.socketService.sendMessage(body);
  }
}

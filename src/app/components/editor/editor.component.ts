import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from 'src/app/socket.service';


var throttleTimer;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  content: any = ``;
  edit: string = ``;
  id: string = ``;
  // url = "https://jsramverk-editor-frah20.azurewebsites.net";
  url ="http://localhost:3000"
  document: any = [];
  text: any;


  @Output() updated = new EventEmitter<string>();
  @Output() collectedDoc = new EventEmitter<any>();
  
  @Input() user: any;
  @Input() token: any;



  constructor(
    private http:HttpClient, 
    private socketService: SocketService) { }

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

  getDocument(id : string) {
    const headers = new HttpHeaders({ 'x-access-token': this.token});

    this.http.get(`${this.url}/documents/${id}`, {headers}).subscribe(res=> 
      {
        this.document = res;
        this.content = this.document.data.text;
        this.collectedDoc.emit(this.document);
      })
  }

  // listen to the socket.io server
  ngOnInit(): void {
    this.socketService.getMessage('message').subscribe((data: any) => {
      this.content = data;
    });
  }

  onChanged(text: any) {
    this.text= text.html;
  }

  onKeyUp(text: any) {
    this.updated.emit(this.text);
    const body: any = {
      id: this.document.data._id,
      title: this.document.data.title,
      text: this.text,
      users: this.document.data.users
    }
    
    this.socketService.sendMessage(body);
  }
}

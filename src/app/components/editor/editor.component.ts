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
  url = "https://jsramverk-editor-frah20.azurewebsites.net";
  document: any = [];
  text: any;

  @Output() updated = new EventEmitter<string>();
  @Output() collectedDoc = new EventEmitter<any>();
  @Output() updateDocs = new EventEmitter<string>();

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

  @Input('resetEdit') set reset(value: any) {
    console.log("in reset")
    if (value) {
        console.log(value)
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

    this.updateDocs.emit(`update`);
  }

  getDocument(id : string) {
    this.http.get(`${this.url}/documents/${id}`).subscribe(res=> 
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
      // console.log(this.id)
    });
  }

  // ngOnInit() {}

  // onKeyUp(text: any) {
  //   if (text.html || this.document.data._id) {
  //     this.updated.emit(text.html);
  //     this.socketService.sendMessage(text.html);
  //   // this.saveContent();
  //   }
  // }

  onChanged(text: any) {
    this.text= text.html;
  }

  onKeyUp(text: any) {
    console.log(this.document)
    console.log(text)
    if(Object.keys(this.document).length === 0) {
      const body: any = {
        text: this.text
      }
      console.log("Sparar nytt id")
      this.createContent(body);
    }
    else if (this.text && this.document) {
      console.log("Id finns")
      this.updated.emit(this.text);

      const body: any = {
        id: this.document.data._id,
        text: this.text
      }
      this.socketService.sendMessage(body);
      this.updateDocs.emit(this.id);
    // this.saveContent();
    }
  }

  saveContent() {
    const body: any = {
      text: this.content
    }
    console.log("I spara")
    console.log(this.document)
    if (Object.keys(this.document).length !== 0) {
      this.postContent(this.document.data._id, body)
    } else {
      this.createContent(body);
    }
  }

  postContent(id: string, body: string) {
    this.http.post(`${this.url}/save/${id}`, body).subscribe(res=> 
      {
      })
  }

  createContent(body: any) {
    this.http.post(`${this.url}/save/new/doc`, body).subscribe(res=> 
      {
        console.log(res)
        this.document = res;
        this.document.data._id=this.document.data.insertedId;
        this.id = this.document.data.insertedId;
        console.log(this.id)
        this.updateDocs.emit(this.id);
      })
  }

}

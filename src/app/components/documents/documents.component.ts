import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from 'src/app/socket.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  url = "https://jsramverk-editor-frah20.azurewebsites.net";
  // url = "http://localhost:3000"
  documents: any;
  buttonText: string = 'Skapa nytt dokument';
  // checked: any = null;
  idSelected: any = null;
  type: string = 'doc';

  constructor(
    private http:HttpClient, 
    private socketService: SocketService,
    private formBuilder: FormBuilder) { }

  @Output() documentId = new EventEmitter<string>();
  @Output() reset = new EventEmitter<any>();

  @Input() user: any;
  @Input() token: any;

  @Input('updateDocs') set updateDocs(value: any) {
    if (value) {
      this.getDocuments();
    }
  }

  @Input('type') set updateType(value: any) {
    if (value) {
      this.type = value;
      this.idSelected = null;
      this.getDocuments();
    }
  }


  title = new FormControl('', [Validators.required, Validators.minLength(5)]);
  titleForm: FormGroup = this.formBuilder.group({
    title: this.title
  });


  createNewDoc() {
    const body = {
      title: this.titleForm.value.title,
      type: this.type,
      username: this.user.user.username,
    }
    const headers = new HttpHeaders({ 'x-access-token': this.token});

    this.http.post(`${this.url}/save/new/doc`, body, {headers}).subscribe(res=> 
      {
        this.getDocuments();
        this.titleForm.reset();
        this.reset.emit("reset");
      })
  }

  
  onSelected(event: any) {
    this.documentId.emit(event.target.id);
    this.socketService.createRoom(event.target.id);
  } 

  async ngOnInit() {
    await this.getDocuments();
  }

  async ngOnUpdate() {
    await this.getDocuments();
  }


  async getDocuments(){
    fetch(`${this.url}/graphql`, {
      method: 'POST',
      headers: {
          'x-access-token': this.token,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({ query: `{ userDocuments(username : "${this.user.user.username}", type: "${this.type}") {_id, title} }`  })
  })
      .then(r => r.json())
      .then(data => {
        data = Object.values(data);
        this.documents = data[0].userDocuments;
        });
  }

  // async getDocuments() {
  //     this.documents = [];
  //     const headers = new HttpHeaders({ 'x-access-token': this.token});
  
  //   await this.http.get(`${this.url}/documents/all`, {headers}).subscribe((res: any)=> 
  //       {
  //         for (let doc in res.data) {
  //           for ( let user in res.data[doc].users) {
  //               if (res.data[doc].users[user] == this.user.user.username) {
  //               this.documents.push(res.data[doc])
  //             }
  //           }
  //         }
  //     })
  // }

}

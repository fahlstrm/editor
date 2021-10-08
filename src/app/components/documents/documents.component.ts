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
  checked: any = null;
  idSelected: any=null;

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
      console.log(value)
      this.getDocuments();
    }
  }

  // @Input('content') set content(value: any) {
  //   if (value) {
  //       console.log(value)
  //       this.checked = "true";
  //       this.getDocuments();
  //   }
  // }

  
  title = new FormControl('', [Validators.required, Validators.minLength(5)]);
  titleForm: FormGroup = this.formBuilder.group({
    title: this.title
  });

  createNewDoc() {
    console.log(this.titleForm.value);
    const body = {
      title: this.titleForm.value.title,
      username: this.user.user.username,
    }
    const headers = new HttpHeaders({ 'x-access-token': this.token});
    this.http.post(`${this.url}/save/new/doc`, body, {headers}).subscribe(res=> 
      {
        console.log(res)
        this.getDocuments();
        this.titleForm.reset();
        this.reset.emit("reset");
      })
  }

  async ngOnInit() {
    await this.getDocuments();
  }

  async ngOnUpdate() {
    await this.getDocuments();
  }

  async getDocuments(){
    // let username = this.user.user.username;
    fetch(`${this.url}/graphql`, {
      method: 'POST',
      headers: {
          'x-access-token': this.token,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({ query: `{ userDocuments(username : "${this.user.user.username}") {_id, title} }`  })
  })
      .then(r => r.json())
      .then(data => {
        console.log("i dokuyment i klient")
        console.log('data returned:', data)
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

  onSelected(event: any) {
    this.documentId.emit(event.target.id);
    this.socketService.createRoom(event.target.id);
  } 
}

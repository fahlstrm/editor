import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from 'src/app/socket.service';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  // url = "https://jsramverk-editor-frah20.azurewebsites.net";
  url = "http://localhost:3000"
  documents: any = [];
  buttonText: string = 'Skapa nytt dokument';
  checked: any = null;
  idSelected: any=null;
 
  constructor(
    private http:HttpClient, 
    private socketService: SocketService) { }

  @Output() documentId = new EventEmitter<string>();
  @Output() resetEditor = new EventEmitter<any>();


  @Input('updateDocs') set updateDocs(value: any) {
    if (value) {
      console.log(value)
      this.getDocuments();
    }
  }

  // @Input() content: string =``;
  @Input() docToEdit: any = {};

  @Input('content') set content(value: any) {
    if (value) {
        console.log(value)
        this.checked = "true";
        this.getDocuments();
    }
  }

  async ngOnInit() {
    await this.getDocuments();
  }

  async ngOnUpdate() {
    await this.getDocuments();
  }

  async getDocuments() {
    
   await this.http.get(`${this.url}/documents/all`).subscribe(res=> 
      {
        this.documents = res;
        console.log(res)
      })
  }

  onSelected(event: any) {
    this.documentId.emit(event.target.id);
    this.socketService.createRoom(event.target.id);
  }


  // setSelected(id: any) {
  //   console.log(id)
  //   for (var obj in this.documents.data) {
  //     console.log((this.documents.data[obj]._id))
  //     if (this.documents.data[obj]._id === id) {
  //       this.idSelected = this.documents.data[obj]._id;
  //     }
   
  //   }
  //   // this.documents.forEach((i :any) =>{
  //   //   console.log(i)
  //   //   if (i === id) {
  //   //     console.log("vald! ")
  //   //   }
  //   //   // i.isSelected=false;
  //   // })
  // }



  resetSelected() {
    console.log(this.documents)
    this.documents.forEach((i :any) =>{
      console.log(i)
      i.isSelected=false;
    })
  }


  clearEditor() {
    this.resetEditor.emit("reset");
    this.getDocuments();
  }
   
}

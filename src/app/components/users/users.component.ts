import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http:HttpClient) { }
  availableUsers: any; 
  currentUsers: any; 
  id: any;
  // url = "https://jsramverk-editor-frah20.azurewebsites.net";
  url = "http://localhost:3000"

  // @Input() documentId: any = null;

  @Input('documentId') set docId(documentId: any) {
    if (documentId) {
        this.getDocUsers(documentId);
        this.id = documentId;
    }
  }

  @Input('reset') set reset(value: any) {
    if (value) {
        this.id = null;
        this.currentUsers = null;
        this.availableUsers = null;
    }
  }
  @Input() token: any;


  ngOnInit(): void {
  }

  async getDocUsers(id: any) {
    const headers = new HttpHeaders({ 'x-access-token': this.token});
    
    await this.http.get(`${this.url}/documents/users/${id}`, {headers}).subscribe((res: any)=> 
       {
         this.currentUsers = res.data.currentUsers;
         this.availableUsers = res.data.availableUsers;

       })
   }
 
  onSelected(event: any) {
    let body = {
      id: this.id,
      newUser: event.target.name
    }
    const headers = new HttpHeaders({ 'x-access-token': this.token});
    
    this.http.post(`${this.url}/save/new/user`, body, {headers}).subscribe((res: any)=> 
      {
        console.log(res);
        this.getDocUsers(this.id);
      })
  }
}

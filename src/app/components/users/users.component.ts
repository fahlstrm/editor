import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http:HttpClient) { }

  users: any; 
  // url = "https://jsramverk-editor-frah20.azurewebsites.net";
  url = "http://localhost:3000"

    

  ngOnInit(): void {
    this.getUsers();
  }


  async getUsers() {
    await this.http.get(`${this.url}/users/all`).subscribe((res: any)=> 
       {
         console.log(res)
         this.users = res.data;
         console.log(this.users[0])
       })
   }
 
  onSelected(event: any) {

  }


}

import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { SocketService } from 'src/app/socket.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  url = "https://jsramverk-editor-frah20.azurewebsites.net";
  // url ="http://localhost:3000"
  selected: any = null;
  comments: any;
  id: any = null;
  content: any = null;
  commentLength: any = [];
  previous : any = null;
  show: boolean = false;

  constructor(
    private http:HttpClient, 
    private socketService: SocketService,
    private cd: ChangeDetectorRef,

    private formBuilder: FormBuilder) {}

  @Input() user: any;
  @Input() token: any;
  @Input() documentId: any;
  @Input() docToEdit: any;
  @Input() type: string = "doc";

  
  @Input('docToEdit') set length(value: any) {
    if (value) {
      if (value.data.type == "doc") {
        this.show = true;
      }
      if (value.data.comments != null) {
          this.commentLength = value.data.comments;
      } else {
        this.commentLength.length = 0;
      }
      this.docToEdit = value;
    }
  }

  @Input('comment') set trigger(value: any) {
    if (value) {
      this.selected = value.selected;
      this.id = value.id;
      this.content = value.content;
    }
  }

  @Input('type') set setType(value: any) {
    if (value == "code") {
      this.commentLength.length = 0;
      this.documentId = null;
      this.type = "code";
      this.show = false;
    } 
  }


  comment = new FormControl('', [Validators.required, Validators.minLength(5)]);
  commentForm: FormGroup = this.formBuilder.group({
    comment: this.comment
  });

createNewComment() {
    var commentId; 
    if (this.commentLength == 0) {
      commentId = 0;
    } else {
      commentId = this.docToEdit.data.comments.length;
    }

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = ('0'+date.getMinutes()).slice(-2);

    let replaceContent = this.content.replace(this.selected, `<span id=${commentId} style="color:#ac5a17">${this.selected}</span>`);
    const body = {
      document: this.docToEdit,
      content: replaceContent,
      comment: {
        comment: this.commentForm.value.comment,
        selected: this.selected,
        user: this.user.user.username,
        date: `${year}-${month}-${day} ${hour}.${minutes}`
      }
    }
    const headers = new HttpHeaders({ 'x-access-token': this.token});

    this.http.post(`${this.url}/comments/create/${this.documentId}`, body, {headers}).subscribe(( res: any)=> 
    {
      this.commentForm.reset();
      this.selected = null;
      this.previous = this.docToEdit.data.comments;
      this.updatedComments();
    })
  }

  ngDoCheck() {
    if (this.docToEdit) {
      if (this.previous !== this.docToEdit.data.comments) {
        this.cd.detectChanges();
        this.commentLength = this.docToEdit.data.comments;
      }
    }
    
  }


  updatedComments() {
    const headers = new HttpHeaders({ 'x-access-token': this.token});

    this.http.get(`${this.url}/comments/${this.documentId}`, {headers}).subscribe(( res: any)=> 
      {
        this.docToEdit = res;
        if (this.type == "doc") {
          this.docToEdit.data.comments.reverse();
        }
      })
  }

    
  ngOnInit(): void {
  }


}

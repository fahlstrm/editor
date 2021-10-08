import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ButtonComponent } from './components/button/button.component';
import { EditorComponent } from './components/editor/editor.component';
import { DocumentsComponent } from './components/documents/documents.component';

import { QuillModule } from 'ngx-quill'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Socket related 
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormComponent } from './components/form/form.component';
import { UsersComponent } from './components/users/users.component';
const config: SocketIoConfig = { url: 'https://jsramverk-editor-frah20.azurewebsites.net', options: {} };

// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToolbarComponent,
    ButtonComponent,
    EditorComponent,
    DocumentsComponent,
    FormComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,

    SocketIoModule.forRoot(config),

    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

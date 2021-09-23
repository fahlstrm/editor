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
import { FormsModule } from '@angular/forms';

// Socket related 
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToolbarComponent,
    ButtonComponent,
    EditorComponent,
    DocumentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    SocketIoModule.forRoot(config),

    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

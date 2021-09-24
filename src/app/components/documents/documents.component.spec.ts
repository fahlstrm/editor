import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DocumentsComponent } from './documents.component';
import { SocketService } from 'src/app/socket.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ButtonComponent } from './../button/button.component';


const config: SocketIoConfig = { url: 'https://jsramverk-editor-frah20.azurewebsites.net' };

describe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsComponent, ButtonComponent ],
      imports: [HttpClientTestingModule, SocketIoModule.forRoot(config)], 
      providers: [ SocketService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    
  it(`should have as buttonText 'Skapa nytt dokument'`, () => {
    const fixture = TestBed.createComponent(DocumentsComponent);
    const document = fixture.componentInstance;
    expect(document.buttonText).toEqual('Skapa nytt dokument');
  });

  it('should contain an button-element of the button component', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button')).not.toBe(null);
  });
});

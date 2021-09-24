import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ToolbarComponent } from './toolbar.component';
import { SocketService } from 'src/app/socket.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'https://jsramverk-editor-frah20.azurewebsites.net' };


describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [HttpClientTestingModule, SocketIoModule.forRoot(config)], 
      providers: [ SocketService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  // it(`should have as buttonText 'Spara'`, () => {
  //   const fixture = TestBed.createComponent(ToolbarComponent);
  //   const toolbar = fixture.componentInstance;
  //   expect(toolbar.buttonText).toEqual('Spara');
  // });

  // it('should contain an button-element of the button component', () => {
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('button')).not.toBe(null);
  // });


});

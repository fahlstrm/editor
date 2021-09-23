
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {}

  sendMessage(data: any) {
    this.socket.emit('message', data);
  }

  createRoom(id: any) {
    this.socket.emit("create", id);
  }

  getMessage(eventName: any) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data)
      });
    });
  }
}



import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocketMessage, SocketMessageType } from 'src/app/models/socketmessage.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  url = "ws://66.70.229.82:8181/?";
  subject: AnonymousSubject<MessageEvent> = new AnonymousSubject<MessageEvent>();
  messages: Subject<SocketMessage>;
  constructor(private router: Router) {
    this.messages = <Subject<SocketMessage>>this.connect(this.url).pipe(
      map(
        (response: MessageEvent): SocketMessage => {
          console.log(response.data);
          let data = JSON.parse(response.data)
          return data;
        }
      )
    );
    console.log("ws initialized.");
  }
  connect(token: string): AnonymousSubject<MessageEvent> {
    if (token) {
      this.subject = this.create(this.url + token);
      console.log("Successfully connected: " + this.url + token);
    }
    console.log(this.subject);
    return this.subject;
  }

  checkSession() {
    this.sendMessage(SocketMessageType.Ping);
  }

  logout() {
    this.sendMessage(SocketMessageType.LogOff);
  }

  private sendMessage(messageType: SocketMessageType) {
    let message = {
      MessageType: messageType,
      TimeStamp: new Date()
    };
    this.messages.next(message);
  }

  private create(url: string): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      error: (err: any) => { console.log(err); },
      complete: () => { },
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
        let socketMessage = data as SocketMessage;
        if (socketMessage.MessageType == SocketMessageType.LogOff) {
          ws.close();
          console.log("logout message received...");
          localStorage.removeItem("token");
          this.router.navigate(["/"]);
        }
      }
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}

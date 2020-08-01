import { Component, OnInit } from '@angular/core';
import { MessagingService } from './shared/messaging.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pushfirebase';

  message;

  constructor(private messagingService: MessagingService) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}
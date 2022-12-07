import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../../../models/ChatMessage';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  constructor() { }

  // TODO: Get the user Data from the browser storage.
  // for now, keep it like this until someone fixed the login with backend.
  @Input() id: number;

  @Input() chatMessage: ChatMessage;

  private dateOptions = { hour: '2-digit', minute: '2-digit'};

  ngOnInit(): void {
  }

  beautifiedTime(): string {
    return new Intl.DateTimeFormat('nl-NL', this.dateOptions).format();
  }

}

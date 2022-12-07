import {Component, OnDestroy, OnInit} from '@angular/core';
import {Room} from '../../models/Room';
import {ChatMessage} from '../../models/ChatMessage';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ChatService} from '../../services/chat.service';
import {TokenStorageService} from '../../services/auth.service/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientfileService} from '../../services/patientfile.service';
import {RoomService} from '../../services/chat/room.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

    public room: Room;

    id: number;
    msg: ChatMessage[] = [];
    currentMessage: ChatMessage;
    otherUserName: string;

    constructor(private rxStompService: RxStompService,
                private chatService: ChatService,
                private roomService: RoomService,
                private patientFileService: PatientfileService,
                private tokens: TokenStorageService,
                protected router: Router,
                protected activatedRoute: ActivatedRoute) {
        // Temporary until I can get the ID through a service
        this.id = 11111;
        this.room = new Room(9, [], 0, 0);
    }

    ngOnInit(): void {
        this.id = this.tokens.getUser().id;
        this.msg = [];
        this.activatedRoute.params.subscribe(params => {
            this.room.roomId = +params.id;
            this.roomService.getFromRoomId(this.room.roomId).subscribe(room => {
                this.room = room;
                this.patientFileService.getSpecificPatient(this.room.patientId).subscribe(data => {
                    console.log(this.room);
                    console.log('Getting doctor username');
                    console.log(data);
                    if (this.tokens.getUser().id === data.doctor.id) {
                        this.otherUserName = data.user.firstname.concat(' ', data.user.lastname);
                    } else {
                        this.otherUserName = data.doctor.firstname.concat(' ', data.doctor.lastname);
                    }
                });

            });
            this.setupData();
        });

    }

    ngOnDestroy(): void {
        this.rxStompService.deactivate();
    }

    setupData(): void {
        this.currentMessage = new ChatMessage(this.id, this.room, '', new Date(Date.now()));

        this.chatService.findAllForRoom(this.room.roomId).subscribe(x => {
            x.forEach((data) => {
                const items = ChatMessage.fromJson(data, this.room);
                console.log(items);
                this.msg.push(items);
            });
        }, error => {
            console.log(error);
        });
        this.subscribeToIncomingMessages();
    }

    subscribeToIncomingMessages(): void {
        this.rxStompService.watch('/chat/receiving/' + this.room.roomId).subscribe((chatMessage) => {
            console.log(chatMessage.body);
            console.log(typeof chatMessage.body);
            this.msg.push(ChatMessage.fromJson(JSON.parse(chatMessage.body), this.room));
        });
    }

    sendMessage(): void {
        this.currentMessage.timestamp = new Date(Date.now());
        const stringBody = JSON.stringify(this.currentMessage);
        this.rxStompService.publish({destination: '/chat/sending/' + this.room.roomId, body: stringBody});
        this.currentMessage = new ChatMessage(this.id, this.room, '', new Date(Date.now()));
    }
}

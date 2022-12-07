import {Room} from './Room';

export class ChatMessage {

    constructor(public senderId: number,
                public room: Room,
                public content: string,
                public timestamp: Date) {
    }

    static fromJson(message: any, room: Room): ChatMessage {
        return new ChatMessage(+message.senderId, room, message.content, new Date(message.date));
    }

    clone(): ChatMessage {
        return new ChatMessage(this.senderId, this.room, this.content, this.timestamp);
    }
}

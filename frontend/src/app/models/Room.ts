import {ChatMessage} from './ChatMessage';

export class Room {

    constructor(public roomId: number, readonly messages: ChatMessage[], readonly patientId, readonly doctorId) {
    }

    addMessage(message: ChatMessage): void {
        this.messages.push(message);
    }

}

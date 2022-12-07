import { Component, OnInit } from '@angular/core';
import {PatientPanelBaseTileComponent} from '../patient-panel-tile/patient-panel-base-tile.component';
import {Router} from '@angular/router';
import {RoomService} from '../../../services/chat/room.service';
import {TokenStorageService} from '../../../services/auth.service/token-storage.service';
import {Room} from '../../../models/Room';

@Component({
  selector: 'app-patient-panel-chat-tile',
  templateUrl: './patient-panel-chat-tile.component.html',
  styleUrls: ['./patient-panel-chat-tile.component.css']
})
export class PatientPanelChatTileComponent extends PatientPanelBaseTileComponent implements OnInit {

  room: Room;

  constructor(private router: Router, private roomRepository: RoomService, private tokens: TokenStorageService) {
    super();
  }

  ngOnInit(): void {
    this.roomRepository.getRoomForUser(this.tokens.getUser().id).subscribe(answer => this.room = answer);
  }

  routeToChat(): void {
    if (this.room !== undefined && this.room !== null) {
      this.router.navigate(['/chat/' + this.room.roomId]);

    }
  }
}

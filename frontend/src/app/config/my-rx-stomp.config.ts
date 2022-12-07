import {TokenStorageService} from '../services/auth.service/token-storage.service';
import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';
import {environment} from '../../environments/environment';

export class MyStompConfig extends InjectableRxStompConfig {

    constructor(tokenService: TokenStorageService) {
        super();
        this.brokerURL = `${environment.websocketUrl}/ws`;
        this.heartbeatIncoming = 0;
        this.heartbeatOutgoing = 10000;
        this.reconnectDelay = 500;
        this.connectHeaders = {
            Authorization: 'Bearer ' + tokenService.getToken()
        };

        this.debug = (msg) => {
            console.log(new Date(), msg);
        };

    }
}

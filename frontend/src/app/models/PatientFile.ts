import {User} from './user';
import {TempAccount} from './TempAccount';

export class PatientFile {

    public roomId;

    constructor(public id: number,
                public birthdate: string,
                public sex: string,
                public phonenumber: string,
                public address: string,
                public allergies: string,
                public user: User,
                public doctor: User,
                public tempAccount: TempAccount) {
    }
}

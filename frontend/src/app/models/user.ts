export class User {


    /*
    usertype: patient: 0, Worker: 1, Admin: 2
     */
    constructor(public id: number,
                public firstname: string,
                public lastname: string,
                public dateOfBirth: Date,
                public zipcode: string,
                public email: string,
                public password: string) {
    }

    static clone(user: User): User {
        return new User(user.id, user.firstname, user.lastname, user.dateOfBirth, user.zipcode, user.email, user.password);
    }


    getName(): string {
        return `${this.firstname} ${this.lastname}`;
    }
}

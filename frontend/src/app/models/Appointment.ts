export class Appointment {
    static title: string;
    static start: Date;
    static authorId: number;
    static doctorId: number;

    constructor(public title: string,
                public start: Date,
                public authorId: number,
                public doctorId: number) {
        this.title = title;
        this.start = start;
        this.authorId = authorId;
        this.doctorId = doctorId;
    }

    static trueCopy(appointment: Appointment): Appointment {
        return new Appointment(
            Appointment.title,
            Appointment.start,
            Appointment.authorId,
            Appointment.doctorId,
            );
    }
}

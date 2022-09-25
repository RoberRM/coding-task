export interface User {
    id: number;
    name: String;
    lastName: String;
    IBAN: String;
    admin_id: number;
}

export interface Admin {
    fullName: String;
    admin_id: number;
}

export class CurrentUser {
    name: String;
    token: String;
}
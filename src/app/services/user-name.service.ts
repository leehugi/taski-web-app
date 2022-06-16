import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserNameService {
    private _loggedInUser: string | null = null;

    get loggedInUser(): string | null{
        return this._loggedInUser;
    }

    set loggedInUser(userName: string | null) {
        this._loggedInUser = userName;
    }
}
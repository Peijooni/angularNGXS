import { Practise } from '../models/Practise';

export class AddPractise {
    static readonly type = '[Practise] Add';

    constructor(public payload: Practise) {}
}

export class DeletePractise {
    static readonly type = '[Practise] Delete';

    constructor(public id: string) {
    }
}

/*
export class UpdateUser {
    static readonly type = '[User] Update';

    constructor(public id: string, public payload: User) {}
}
*/
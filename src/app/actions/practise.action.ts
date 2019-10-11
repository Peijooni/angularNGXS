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

export class InitPractises {
    static readonly type = '[Practise] Init';

    constructor() {}
}

export class UpdatePractise {
    static readonly type = '[User] Update';

    constructor(public payload: Practise) {}
}

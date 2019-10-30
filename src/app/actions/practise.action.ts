import { Practise } from '../models/Practise';

export class AddPractise {
    static readonly type = '[Practise] Add';

    constructor(public payload: Practise) {}
}

export class DeletePractise {
    static readonly type = '[Practise] Delete';

    constructor(public id: number) {
    }
}

export class InitPractises {
    static readonly type = '[Practise] Init';

    constructor() {}
}

export class UpdatePractise {
    static readonly type = '[Practise] Update';

    constructor(public payload: Practise) {}
}

export class LogIn {
    static readonly type = '[LogIn] LoggedIn';

    constructor(public payload: string) {}
}

export class LogOut {
    static readonly type = '[LogIn] LoggedOut';

    constructor() {}
}

export class Loading {
    static readonly type = '[Loading] Loading on';

    constructor() {}
}

export class NotLoading {
    static readonly type = '[Loading] Loading off';

    constructor() {}
}

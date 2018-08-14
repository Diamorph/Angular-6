import { Action} from '@ngrx/store';

export enum TransactionsActionTypes {
    Load_Transactions = 'Load Transactions',
    Load_Transactions_Success = 'Load Transactions Success',
    Load_Transactions_Failure = 'Load Transactions Failure',
    Transactions_Reset = 'Transactions Reset',
    Load_Total_Info = 'Load Total Info',
    Load_Total_Info_Success = 'Load Total Info Success',
    Load_Total_Info_Failure = 'Load Total Info Failure',
    Total_Info_Reset = ' Total Info Reset',
    Form_Request_data = 'Form Request data',
    Set_current_page = 'Set current page'
}

export class LoadTransactions implements Action {
    readonly type = TransactionsActionTypes.Load_Transactions;
    constructor(public payload: any) {}
}

export class LoadTransactionsSuccess implements Action {
    readonly type = TransactionsActionTypes.Load_Transactions_Success;
    constructor(public payload: any) {}
}

export class LoadTransactionsFailure implements Action {
    readonly type = TransactionsActionTypes.Load_Transactions_Failure;
    constructor(public payload) {}
}

export class TransactionsReset implements Action {
    readonly type = TransactionsActionTypes.Transactions_Reset;
    constructor() {}
}

export class LoadTotalInfo implements Action {
    readonly type = TransactionsActionTypes.Load_Total_Info;
    constructor(public payload:any) {}
}

export class LoadTotalInfoSuccess implements Action {
    readonly type = TransactionsActionTypes.Load_Total_Info_Success;
    constructor(public payload: any) {}
}

export class LoadTotalInfoFailure implements Action {
    readonly type = TransactionsActionTypes.Load_Total_Info_Failure;
    constructor(public payload) {}
}

export class TotalInfoReset implements Action {
    readonly type = TransactionsActionTypes.Total_Info_Reset;
    constructor() {}
}

export class FormRequestData implements Action {
    readonly type = TransactionsActionTypes.Form_Request_data;
    constructor(public payload: any[]) {}
}

export class SetCurrentPage implements Action {
    readonly type = TransactionsActionTypes.Set_current_page;
    constructor(public payload: number) {}
}


export type TransactionsActions =   LoadTransactions | LoadTransactionsSuccess | LoadTransactionsFailure | FormRequestData
    | LoadTotalInfo | LoadTotalInfoSuccess | LoadTotalInfoFailure | TotalInfoReset | TransactionsReset | SetCurrentPage;

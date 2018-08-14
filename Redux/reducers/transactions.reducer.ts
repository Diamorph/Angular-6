import {TransactionsActions, TransactionsActionTypes} from '@app/transactions/actions/transactions.actions';

export interface State {
    transactions: {transactions: any[], total: number};
    load_transaction_pending: boolean;
    transaction_error;
    form_request_data: any[];      // data from form
    load_pending_total: boolean;
    error_total_data;
    total_data : any;
    current_page: number;
}

export const initialState: State = {
    transactions: {transactions : [], total: 0},
    load_transaction_pending: false,
    transaction_error: null,
    form_request_data: [],
    load_pending_total: false,
    error_total_data: null,
    total_data: null,
    current_page: null
};

export function reducer (state = initialState, action: TransactionsActions): State {
    switch (action.type) {
        case TransactionsActionTypes.Load_Transactions: return {...state, load_transaction_pending: true, transaction_error: null };
        case TransactionsActionTypes.Load_Transactions_Success: return {...state, transactions: action.payload, load_transaction_pending: false};
        case TransactionsActionTypes.Load_Transactions_Failure: return {...state, transactions: null, load_transaction_pending: false, transaction_error: action.payload};
        case TransactionsActionTypes.Transactions_Reset: return {...state, transactions: {transactions : [], total: 0}, load_transaction_pending: false, transaction_error: null};
        case TransactionsActionTypes.Load_Total_Info: return {...state, load_pending_total: true, error_total_data: null};
        case TransactionsActionTypes.Load_Total_Info_Success: return {...state, load_pending_total: false, total_data: action.payload};
        case TransactionsActionTypes.Load_Total_Info_Failure: return {...state, load_pending_total: false, total_data: null, error_total_data: action.payload};
        case TransactionsActionTypes.Total_Info_Reset: return {...state, load_pending_total: false, total_data: null, error_total_data: null};
        case TransactionsActionTypes.Form_Request_data: return {...state, form_request_data: action.payload};
        case TransactionsActionTypes.Set_current_page: return {...state, current_page:action.payload};
        default: return state;
    }
}

export const selectTransactionsPending = (state: State) => state.load_transaction_pending;
export const selectTransactions = (state: State) => state.transactions;
export const selectTransactionsError = (state: State) => state.transaction_error;
export const selectPendingTotal = (state: State) => state.load_pending_total;
export const selectTotalData = (state: State) => state.total_data;
export const selectErrorTotal = (state: State) => state.error_total_data;
export const selectFormRequestData = (state: State) => state.form_request_data;
export const selectCurrenPage = (state: State) => state.current_page;







import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTransactions from './transactions.reducer';
import * as fromCore from '@app/core/reducers';
import {selectCurrenPage} from "./transactions.reducer";

export interface TransactionsState {
    transactions: fromTransactions.State;
}
export interface State extends fromCore.State {
    transactions: TransactionsState;
}
export const reducers: ActionReducerMap<TransactionsState> = {
    transactions: fromTransactions.reducer
};

export const selectFeatureTransactions = createFeatureSelector<fromTransactions.State>('transactions');
export const selectTransactions = createSelector(selectFeatureTransactions, fromTransactions.selectTransactions);
export const selectTransactionsPending = createSelector(selectFeatureTransactions, fromTransactions.selectTransactionsPending);
export const selectTransactionsError = createSelector(selectFeatureTransactions, fromTransactions.selectTransactionsError);
export const selectFormRequestData = createSelector(selectFeatureTransactions, fromTransactions.selectFormRequestData);
export const selectTotalData = createSelector(selectFeatureTransactions, fromTransactions.selectTotalData);
export const selectPendingTotal = createSelector(selectFeatureTransactions, fromTransactions.selectPendingTotal);
export const selectErrorTotal = createSelector(selectFeatureTransactions, fromTransactions.selectErrorTotal);
export const selectCurrentPage = createSelector(selectFeatureTransactions, fromTransactions.selectCurrenPage);


















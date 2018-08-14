import {of} from 'rxjs/observable/of';
import {catchError, filter, switchMap} from 'rxjs/operators';
import {TransactionsActionTypes} from '@app/transactions/actions/transactions.actions';
import * as transactionsActions from '../actions/transactions.actions';
import * as fromCore from '@app/core/reducers';
import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {TransactionService} from '@app/transactions/services/transaction.service';


@Injectable()
export class TransactionsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<fromCore.State>,
        private transactionService: TransactionService
    ) {}
    @Effect()
    loadTransactions$ = this.actions$.ofType(TransactionsActionTypes.Load_Transactions).pipe(
        switchMap(params => {
            console.log('Load Transactions Params: ', params);
            return this.transactionService.getTransactions(params).pipe(
                switchMap(list => [new transactionsActions.LoadTransactionsSuccess(list)]),
                catchError(error => of(new transactionsActions.LoadTransactionsFailure(error)))
            );
        })
    );
    @Effect()
    loadTotalData$ = this.actions$.ofType(TransactionsActionTypes.Load_Total_Info).pipe(
        switchMap(params => {
            console.log('Load Total Data Params: ', params);
            return this.transactionService.getTotalData(params).pipe(
                switchMap(data => [new transactionsActions.LoadTotalInfoSuccess(data)]),
                catchError(error => of(new transactionsActions.LoadTotalInfoFailure(error)))
            )
        })
    )
}

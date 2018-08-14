import {Component, OnChanges, OnInit} from '@angular/core';
import * as fromDeals from '@app/portfolio/reducers';
import * as fromCore from '@app/core/reducers';
import {Store} from '@ngrx/store';
import * as fromTransactions from './reducers';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
    constructor(
        private store: Store<fromCore.State>,
    ) {}
    deals$ = this.store.select(fromDeals.selectDealsInvestments);
    transaction_pending$ = this.store.select(fromTransactions.selectTransactionsPending);
    transactions$ = this.store.select(fromTransactions.selectTransactions).map(data => data.transactions);
    total_transaction_length$ = this.store.select(fromTransactions.selectTransactions).map(data => data.total);
    form_request_data$ = this.store.select(fromTransactions.selectFormRequestData);
    transactions_total$ = this.store.select(fromTransactions.selectTotalData);
    pending_total$ = this.store.select(fromTransactions.selectPendingTotal);
    current_page$ = this.store.select(fromTransactions.selectCurrentPage);
}

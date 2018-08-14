import {Component, OnChanges, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromTransactions from '../reducers';
import * as Actions from '@app/transactions/actions/transactions.actions';
import {TransactionService} from "@app/transactions/services/transaction.service";

@Component({
    selector: 'transactions-table',
    templateUrl: './transactions-table.component.html',
    styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnChanges, OnInit {
    @Input('pending') pending;
    @Input('transactions') transactions;
    @Input('form_request_data') form_request_data;
    @Input('total') total;
    @Input('current_page') current_page;
    pager;
    form_request_data_change;
    emptyTransactionMessage : boolean = false;
    constructor(
        private store: Store<fromTransactions.State>,
        private transactionService: TransactionService) {}
    ngOnInit() {
        this.emptyTransactionMessage = false;
        if(this.current_page && this.total) {this.pager = this.transactionService.getPager(this.total, this.current_page)}
    }
    ngOnChanges() {
        this.emptyTransactionMessage = false;
        if (this.pending === false && this.form_request_data_change !== this.form_request_data) {
            //this.currentPage = 1;
            this.pager = this.transactionService.getPager(this.total, 1);
            this.form_request_data_change = this.form_request_data;
        }
        if (this.pending === false && this.total === 0){
            this.emptyTransactionMessage = true;
        }
    }
    setPage(page: number) {
        if(page < 1){
            page = 1;
        }
        if(page > this.pager.totalPages){
            page = this.pager.totalPages;
        }
        const start_index = (page === 1) ?  0 :  (page - 1) * 20 - 1;
        const form_request_data_start_index = [this.form_request_data[0], this.form_request_data[1], this.form_request_data[2], start_index,
            this.form_request_data[4], this.form_request_data[5], this.form_request_data[6]];
        // get pager object from service
        this.pager = this.transactionService.getPager(this.total, page);
        console.log(this.pager.currentPage);
        // get current page of items
        this.store.dispatch(new Actions.SetCurrentPage(page));
        this.store.dispatch(new Actions.LoadTransactions(form_request_data_start_index));
    }
}

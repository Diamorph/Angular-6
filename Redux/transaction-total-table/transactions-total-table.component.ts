import {Component, Input, OnChanges} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromTransactions from "@app/transactions/reducers";
import * as Actions from '@app/transactions/actions/transactions.actions';

@Component({
    selector: 'transactions-total-table',
    templateUrl: './transactions-total-table.component.html',
    styleUrls: ['./transactions-total-table.component.scss']
})
export class TransactionsTotalTableComponent implements  OnChanges{
    @Input('pending') pending;
    @Input('data') data;
    @Input('form_request_data') request_data;
    start_date;
    end_date;
    currency;
    type;
    displayDates: boolean;
    constructor(private store: Store<fromTransactions.State>) {}
    ngOnChanges() {
        if(this.request_data.length) {
            this.start_date = this.request_data[0];
            this.end_date = this.request_data[1];
            this.currency = this.request_data[2];
            this.type = this.request_data[5];
            (this.type === 'All') ? this.displayDates = true : this.displayDates = false;
        }
    }
    loadType(type_of_investment:string) {
        const new_request_data = [this.request_data[0], this.request_data[1], this.request_data[2], this.request_data[3],
            this.request_data[4], type_of_investment, this.request_data[6]];
        // this.request_data[5] = type_of_investment;
        console.log(new_request_data);
        this.store.dispatch(new Actions.LoadTransactions(new_request_data));
        this.store.dispatch(new Actions.FormRequestData(new_request_data));
        //this.store.dispatch(new Actions.LoadTotalInfo(this.request_data));
    }
}
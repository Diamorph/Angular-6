import {Component, Inject, OnInit, Input, OnChanges, ViewChild, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {appConfig} from '@app/config/app.config';
import {Investment} from '@app/product/investment.model';
import {PortfolioService} from '@app/portfolio/services/portfolio.service';
import {TransactionService} from '@app/transactions/services/transaction.service';
import * as fromTransactions from '../reducers/transactions.reducer';
import * as Actions from '../actions/transactions.actions';
import {Store} from '@ngrx/store';

const allDeals = {label: 'All', id: 'all'};
const EmptyDeal = {label: 'Empty', id: 'all'};
const start_index = 0;
const limit = 20;
@Component({
    selector: 'transactions-form',
    templateUrl: './transactions-form.component.html',
    styleUrls: ['./transactions-form.component.scss']
})

export class TransactionsFormComponent implements OnInit, OnChanges {
    @Input('deals') deals;
    @ViewChild('datepicker') datepicker;
    date: Date = new Date();
    date1: Date = new Date();
    settings = {
        bigBanner: false,
        format: 'dd-MMM-yyyy',
        defaultOpen: false
    };
    dealTypes;
    model;
    currency;
    type;
    form: FormGroup;
    start_date;
    end_date;
    mobileView = [];
    shownInvestments: Investment[] = [];
    date_error = false;
    constructor(
        private portfolioService: PortfolioService,
        private fb: FormBuilder,
        private transactionsService: TransactionService,
        private store: Store<fromTransactions.State>,
    ) {
        this.dealTypes = [
            {label: 'transactions.deal-types.all', value: 'All'},
            {label: 'transactions.deal-types.deposits', value: 'Deposits'},
            {label: 'transactions.deal-types.withdrawals', value: 'Withdrawals'},
            {label: 'transactions.deal-types.investment', value: 'Investment'},
            {label: 'transactions.deal-types.interest-received', value: 'Interest received'},
            {label: 'transactions.deal-types.principal-payment', value: 'Principal payment'},
            {label: 'transactions.deal-types.preterm-exit', value: 'Preterm exit'},
            {label: 'transactions.deal-types.buy-back', value: 'Buy back'},
            {label: 'transactions.deal-types.preterm-exit', value: 'Preterm exit'},
            {label: 'transactions.deal-types.penalty-for-early-exit', value: 'Penalty for early exit'}

        ];
        this.form = fb.group({
            start_date: this.date,
            end_date: this.date1,
            type: [this.dealTypes[0]],
            deal: [allDeals],
            currency: [appConfig.defaultCurrency],
        });
    }

    closeDatepicker(datepicker) {
        datepicker.popover = false;
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.setDeals();
    }

    setDeals() {
        console.log('deals:', this.deals);
        const finalView = this.deals.filter(i => i.status !== 'CLOSED' && i.currency === this.form.value.currency);
        if (finalView.length > 0) {
            this.shownInvestments = finalView.sort((a, b) => {
                return (new Date(b.createDateTime)).getTime() - (new Date(a.createDateTime)).getTime();
            });
            console.log(this.shownInvestments);
            this.mobileView = this.shownInvestments.map(mapInvestmentToFormControl);
            console.log(this.mobileView);
            this.mobileView.unshift(allDeals);
            this.form.patchValue({deal: this.mobileView[0]});     // when you change currency set form value of deal to the first deal
        } else {
            this.mobileView = [];
            this.mobileView.unshift(EmptyDeal);
            this.form.patchValue({deal: this.mobileView[0]});     // when you change currency set form value of deal to the first deal
        }
    }
    get deal() {
        return this.form.get('deal');
    }
    onSubmit() {
        this.date_error = false;
        const start_date = this.transactionsService.dateTransform(new Date(this.form.value.start_date));
        const end_date = this.transactionsService.dateTransform(new Date(this.form.value.end_date));
        if (this.transactionsService.dateUTCreset(new Date(this.form.value.end_date)) < this.transactionsService.dateUTCreset(new Date(this.form.value.start_date))) {
            this.date_error = true;
            this.store.dispatch(new Actions.TotalInfoReset());
            this.store.dispatch(new Actions.TransactionsReset());
        } else {
            const request_data = [start_date, end_date, this.form.value.currency, start_index, limit, this.form.value.type.value, this.form.value.deal.id];
            console.log(request_data);
            (this.form.value.deal.id === 'all') ? this.store.dispatch(new Actions.LoadTotalInfo(request_data)) : this.store.dispatch(new Actions.TotalInfoReset());
            this.store.dispatch(new Actions.LoadTransactions(request_data));
            this.store.dispatch(new Actions.FormRequestData(request_data));
        }
    }
}

function mapInvestmentToFormControl(i: Investment) {
    const label = `#${i.id} ${i.title} - ${i.startAmount} ${i.currency}`;
    return {label: label, value: i, id: i.id};
}

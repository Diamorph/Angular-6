import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {SharedModule} from '@shared/shared.module';
import {RouterModule} from '@angular/router';
import {TransactionsComponent} from './transactions.component';
import {TransactionsFormComponent} from '@app/transactions/transactions-form/transactions-form.component';
import {TransactionsTableComponent} from '@app/transactions/transction-table/transactions-table.component';
import {AngularDateTimePickerModule} from 'angular2-datetimepicker';
import {TransactionService} from '@app/transactions/services/transaction.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {TransactionsEffects} from '@app/transactions/effects/transactions.effects';
import { reducer } from './reducers/transactions.reducer';
import {TransactionsTotalTableComponent} from "@app/transactions/transaction-total-table/transactions-total-table.component";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        TranslateModule.forChild(),
        AngularDateTimePickerModule,
        StoreModule.forFeature('transactions', reducer),
        EffectsModule.forFeature([TransactionsEffects])
    ],
    declarations: [
       TransactionsComponent,
       TransactionsFormComponent,
       TransactionsTableComponent,
        TransactionsTotalTableComponent
    ],
    providers: [
        TransactionService
    ]
})
export class TransactionsModule { }


import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {TransferHttpService} from '@app/core/services/transfer-http';

@Injectable()
export class TransactionService {
    apiUrl = environment.apiUrl;
    constructor(
        private http: TransferHttpService,
    ) {}
    getTransactions(request_data) {
        const [start_date, end_date, currency, start, limit, type, deal_id] = request_data.payload;
        let params = {
            from: start_date,
            to: end_date,
            currency: currency,
            start: start,
            limit: limit
        };
        if (type !== 'All') {
            params['transactionType'] = type;
        }
        if (deal_id !== 'all'){
            params['dealId'] = deal_id;
        }
        console.log('Params HTTP:', params);
        return this.http
            .get(this.apiUrl + '/portfolio/statement', {params : params}).map(res => res.data);
    }

    getTotalData(request_data) {
        // http://localhost:8080/portfolio/statementBalance?from=2018-06-25&to=2018-07-28&currency=EUR
        const [start_date, end_date, currency] = request_data.payload;
        const type = request_data.payload[5];
        let params = {
            from: start_date,
            to: end_date,
            currency: currency
        };
        if (type !== 'All') {
            params['transactionType'] = type;
        }
        console.log('HTTP params Total Data:', params);
        //
        // return this.http
        //     .get(this.apiUrl + '/portfolio/statementBalance?from=' + start_date + '&to=' + end_date + '&currency=' + currency)
        //     .map(res => res.data);
        return this.http.get(this.apiUrl + '/portfolio/statementBalance', {params: params}).map(res => res.data);
    }

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 20) {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);
        console.log('Total pages:', totalPages);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    dateUTCreset(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        return new Date(year, month, day);
    }

    dateTransform(date: Date) {
        const year = date.getFullYear();
        const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
        const month = (date.getMonth() < 9) ? '0' + (date.getMonth() + 1).toString() : date.getMonth() + 1;
        return year + '-' + month + '-' + day;
    }
}

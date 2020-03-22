import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Router } from '@angular/router';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
    userId: string;
    accountId: number;
    accountName: string;
    fromList = [
        { id: 1, name: '微信', img: '' },
        { id: 2, name: '支付宝', img: '' },
        { id: 3, name: '银行卡', img: '' },
    ];
    labelList: {
        id: number;
        name: string;
        img: string;
    }[];
    chosenLabelName: string;
    showModal = false;
    moneyNum = 0;
    comment: string;
    isIncome = false;
    nowChosenIndex = -1;

    constructor(private router: Router, private apiService: ApiService, private toast: ToastService) { }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        // if (!this.userId) {
        //     this.router.navigate(['/login']);
        // }
        this.getBillLabel();
    }

    getBillLabel() {
        this.apiService.getBillLabel().subscribe(({code, msg, data}) => {
            if (code === 0) {
                this.labelList = data;
            } else {
                this.toast.fail('后台接口还没好哟,待会再来看看~', 2000);
            }
        });
    }

    seeBill(id, name) {
        this.router.navigate(['/account/bill'], { queryParams: { id, name } });
    }

    addRecord(id, name) {
        this.showModal = true;
        this.accountId = id;
        this.accountName = name;
    }

    choseOneImg(index) {
        this.nowChosenIndex = index;
        this.chosenLabelName = this.labelList[index].name;
    }

    toggleIncomeType() {
        this.isIncome = !this.isIncome;
    }

    confirmAdd() {
        if (!this.moneyNum || this.nowChosenIndex < 0) {
            this.toast.offline('填点啥呗~_~!', 1000);
            return;
        }
        this.apiService.addBill({
            user_id: parseInt(this.userId, 10),
            type: this.isIncome ? 1 : 0,
            account_id: this.accountId,
            account_name: this.accountName,
            money: this.moneyNum,
            label_id: this.labelList[this.nowChosenIndex].id,
            label_name: this.chosenLabelName,
            comment: this.comment
        }).subscribe(({ code, msg }) => {
            if (code === 0) {

            } else {
                this.toast.fail('后台接口还没好哟,待会再来看看~', 2000);
            }
        });
    }

}

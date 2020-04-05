import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Router } from '@angular/router';
import { dateTransform } from 'src/app/shared/util';

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
    moneyNum: number;
    chosenDate = new Date();
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


    currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
        const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
        return format
            .replace('yyyy', date.getFullYear())
            .replace('mm', pad(date.getMonth() + 1))
            .replace('dd', pad(date.getDate()))
            .replace('HH', pad(date.getHours()))
            .replace('MM', pad(date.getMinutes()))
            .replace('ss', pad(date.getSeconds()));
    }

    setChosenDate(result: Date) {
        console.log(dateTransform(result, 'day'))
    }

    formatIt(date: Date, form: string) {
        const pad = (n: number) => (n < 10 ? `0${n}` : n);
        const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
        if (form === 'YYYY-MM-DD') {
            return dateStr;
        }
        if (form === 'HH:mm') {
            return timeStr;
        }
        return `${dateStr} ${timeStr}`;
    }

    getBillLabel() {
        this.apiService.getBillLabel().subscribe(({ code, msg, data }) => {
            if (code === 0) {
                this.labelList = data;
            } else {
                this.toast.fail('接口异常啦,待会再来看看~', 2000);
            }
        });
    }

    seeBill(id, name) {
        this.router.navigate(['/account/bill'], { queryParams: { id, name } });
    }

    seePieChart() {
        this.router.navigate(['/account/pie']);
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
            label_img: this.labelList[this.nowChosenIndex].img,
            label_name: this.chosenLabelName,
            comment: this.comment,
            // create_time: dateTransform(this.chosenDate, 'day')
        }).subscribe(({ code, msg }) => {
            if (code === 0) {
                this.toast.success('有多辣一笔~', 2000);
                this.showModal = false;
            } else {
                this.toast.fail('接口异常啦,待会再来看看~', 2000);
            }
        });
    }

}

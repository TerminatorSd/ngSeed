import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ToastService } from 'ng-zorro-antd-mobile';

@Component({
    selector: 'app-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
    userId: string;
    accountId: number;
    accountName: string;
    billSum: {
        rest: number;
        income: number;
        pay: number;
    };
    billList: {
        label_id: number, label_name: string, comment: string, label_img: string, money: number,
        account_name: string, account_id: number, type: boolean, create_time: string; time?: string; day?: string;
    }[] = [];

    name2 = '选择';
    value2 = [];
    // value = [];
    name = '选择';
    value = new Date(2019, 4);

    constructor(private route: ActivatedRoute, private apiService: ApiService, private toast: ToastService) { }

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

    onOk(result: Date) {
        this.name = this.currentDateFormat(result);
        this.value = result;
    }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        this.route.queryParams.subscribe(({ id, name }) => {
            this.accountId = id;
            this.accountName = name;
            this.getBillList();
        });
    }

    getBillList() {
        const tempDay = ["日", "一", "二", "三", "四", "五", "六"];
        this.apiService.fetchBillList({
            user_id: parseInt(this.userId, 10),
            date: '2020-03',
            account_id: this.accountId,
            account_name: this.accountName
        }).subscribe(({ code, msg, data }) => {
            if (code === 0) {
                const { rest, income, pay, item_list } = data;
                this.billSum = { rest, income, pay };
                this.billList = item_list || [];
                this.billList.forEach(item => {
                    const tempTime = new Date(item.create_time);
                    item.time = `${tempTime.getMonth() + 1}-${tempTime.getDate()}`;
                    item.day = `周${tempDay[tempTime.getDay()]}`;
                });
            } else {
                this.toast.fail('获取历史记录出错咯,待会再来看看~', 2000);
            }
        });
    }

}

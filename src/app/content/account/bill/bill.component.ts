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
        time: string;
        day: string;
        list: { type: string; img: string; comment: string; money: number; income: boolean }[];
    }[];

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
        this.billList = [
            {
                time: '2020-3-16',
                day: '周一',
                list: [
                    { type: '交通', img: 'traffic', comment: '坐公交', money: 6, income: false },
                    { type: '吃饭', img: 'eat', comment: '牛肉饭', money: 25, income: false }
                ]
            },
            {
                time: '2020-3-13',
                day: '周五',
                list: [
                    { type: '交通', img: 'traffic', comment: '坐公交', money: 6, income: false }
                ]
            }
        ];
    }

    getBillList() {
        this.apiService.fetchBillList({
            user_id: parseInt(this.userId, 10),
            date: '2020-03',
            account_id: this.accountId,
            account_name: this.accountName
        }).subscribe(({ code, msg, data }) => {
            if (code === 0) {
                const { rest, income, pay, item_list } = data;
                this.billSum = { rest, income, pay };
                this.billList = item_list;
                // this.billList.forEach(item => item.create_time)
            } else {
                this.toast.fail('获取历史记录出错咯,待会再来看看~', 2000);
            }
        });
    }

}

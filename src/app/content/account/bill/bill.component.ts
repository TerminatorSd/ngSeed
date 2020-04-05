import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import { dateTransform } from 'src/app/shared/util';

@Component({
    selector: 'app-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
    userId: string;
    accountId: number;
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
    chosenMonth = new Date(new Date().getFullYear(), new Date().getMonth());
    // account select
    value3 = [];
    accountList = [
        '微信', '支付宝', '银行卡', '所有'
        // {id: 1, name: '微信'}
    ];
    chosenAccount: string;
    chosenAccountArr: string[];
    // 编辑或删除单条记录
    labelList: {
        id: number;
        name: string;
        img: string;
    }[];
    chosenLabelName: string;
    showModal = false;
    chosenDate = new Date();
    moneyNum = 0;
    comment: string;
    isIncome = false;
    nowChosenIndex = -1;
    sampleId: number;

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

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        this.route.queryParams.subscribe(({ id, name }) => {
            this.accountId = parseInt(id, 10);
            this.chosenAccountArr = [name];
            this.getBillList();
        });
    }

    getBillList() {
        // 获取当前选中的月份
        const year = this.chosenMonth.getFullYear();
        const month = this.chosenMonth.getMonth() + 1;
        const monthStr = month < 10 ? `0${month}` : month;
        const tempDay = ["日", "一", "二", "三", "四", "五", "六"];
        // send params
        const params = {
            user_id: parseInt(this.userId, 10),
            date: `${year}-${monthStr}`,
        };
        const idFromAccountName = {
            微信: 1,
            支付宝: 2,
            银行卡: 3
        };
        this.chosenAccount = this.chosenAccountArr[0];
        if (this.chosenAccount !== '所有') {
            Object.assign(params, {
                account_id: idFromAccountName[this.chosenAccount],
                account_name: this.chosenAccount
            });
        }
        this.apiService.fetchBillList(params).subscribe(({ code, msg, data }) => {
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

    getBillLabel(item) {
        this.apiService.getBillLabel().subscribe(({ code, msg, data }) => {
            if (code === 0) {
                this.labelList = data;
                // 编辑前填充已有的内容
                const { sample_id, label_id, label_name, money, type, create_time, comment } = item;
                this.moneyNum = money;
                this.comment = comment;
                this.chosenLabelName = label_name;
                this.sampleId = sample_id;
                this.isIncome = type ? true : false;
                this.labelList.forEach((ele, index) => {
                    if (ele.id === label_id) {
                        this.nowChosenIndex = index;
                    }
                });
            } else {
                this.toast.fail('get bill label接口还没好哟,待会再来看看~', 2000);
            }
        });
    }

    showEditModal(item) {
        this.showModal = true;
        this.getBillLabel(item);
    }

    confirmUpdate() {
        if (!this.moneyNum || this.nowChosenIndex < 0) {
            this.toast.offline('填点啥呗~_~!', 1000);
            return;
        }
        this.apiService.updateBill({
            user_id: parseInt(this.userId, 10),
            sample_id: this.sampleId,
            type: this.isIncome ? 1 : 0,
            account_id: this.accountId,
            account_name: this.chosenAccount,
            money: this.moneyNum,
            label_id: this.labelList[this.nowChosenIndex].id,
            label_img: this.labelList[this.nowChosenIndex].img,
            label_name: this.chosenLabelName,
            comment: this.comment,
            // create_time: dateTransform(this.chosenDate, 'day')
        }).subscribe(({ code, msg }) => {
            if (code === 0) {
                this.toast.success('更新成功~', 2000);
                this.showModal = false;
                this.getBillList();
            } else {
                this.toast.fail('接口异常啦,待会再来看看~', 2000);
            }
        });
    }

    confirmDel() {
        this.apiService.deleteBill({
            user_id: parseInt(this.userId, 10),
            sample_id: this.sampleId
        }).subscribe(({ code, msg }) => {
            if (code === 0) {
                this.toast.success('删除成功~', 2000);
                this.showModal = false;
                this.getBillList();
            } else {
                this.toast.fail('接口异常啦,待会再来看看~', 2000);
            }
        });
    }

    choseOneImg(index) {
        this.nowChosenIndex = index;
        this.chosenLabelName = this.labelList[index].name;
    }

    toggleIncomeType() {
        this.isIncome = !this.isIncome;
    }

}

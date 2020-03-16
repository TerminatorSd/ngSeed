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
    fromList = [
        { name: '微信', img: '' },
        { name: '支付宝', img: '' },
        { name: '银行卡', img: '' },
    ];
    habitImgList = ['traffic', 'daily', 'fun', 'eat', 'health',
        'house', 'hz', 'others', 'study', 'travel'];
    showModal = false;
    moneyNum = 0;
    nowChosenIndex = -1;

    constructor(private router: Router, private apiService: ApiService, private toast: ToastService) { }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        if (!this.userId) {
            this.router.navigate(['/login']);
        }
    }

    addRecord() {
        this.showModal = true;
    }

    choseOneImg(index) {
        this.nowChosenIndex = index;
    }

    confirmAdd() {
        if (!this.moneyNum || this.nowChosenIndex < 0) {
            this.toast.offline('填点啥呗~_~!', 1000);
            return;
        }
        this.apiService.excLogin({
            user_id: parseInt(this.userId, 10),
            type: 1,
            money_num: this.moneyNum,
            img: this.habitImgList[this.nowChosenIndex]
        }).subscribe(({ code, msg }) => {
            if (code === 0) {

            } else {
                this.toast.fail('后台接口还没好哟,待会再来看看~', 2000);
            }
        });
    }

}

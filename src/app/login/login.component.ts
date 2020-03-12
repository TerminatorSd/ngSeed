import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { isFullScreen } from '../shared/util';
import { Router } from '@angular/router';
import { ToastService } from 'ng-zorro-antd-mobile';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    name: string;
    password: string;
    needRegister = true;

    constructor(private router: Router, private apiService: ApiService, private toast: ToastService) { }

    ngOnInit() {
        if (isFullScreen()) {
            // alert('全面屏手机');
        }
    }

    doRegister() {
        if (!this.name || !this.password) {
            this.toast.offline('填点啥呗-_-!', 1000);
            return;
        }
        this.apiService.excRegister({
            name: this.name,
            password: this.password
        }).subscribe(({ code, msg }) => {
            if (code === 0) {
                this.toast.success('注册成功！可以去登录辣~');
                this.needRegister = false;
            } else {
                this.toast.fail(msg, 2000);
            }
        });
    }

    doLogin() {
        if (!this.name || !this.password) {
            this.toast.offline('填点啥呗-_-!', 1000);
            return;
        }
        this.apiService.excLogin({
            name: this.name,
            password: this.password
        }).subscribe(({ code, msg, data }) => {
            if (code === 0) {
                const { userId } = data;
                localStorage.setItem('userId', userId);
                this.router.navigate(['/habit/list']);
            } else {
                this.toast.fail(msg, 2000);
            }
        });
    }

}

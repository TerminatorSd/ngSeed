import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { isFullScreen } from '../shared/util';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    name: string;
    password: string;
    needRegister = true;

    constructor(private router: Router, private apiService: ApiService) { }

    ngOnInit() {
        if (isFullScreen()) {
            // alert('全面屏手机');
        }
    }

    doRegister() {
        if (!this.name || !this.password) {
            alert('输点啥呗-_-!');
            return;
        }
        const params = {
            name: this.name,
            password: this.password
        };
        this.apiService.excRegister(params).subscribe(({ code, msg }) => {
            if (code === 0) {
                alert('注册成功！可以去登录辣~');
                this.needRegister = false;
            } else {
                alert(msg);
            }
        });
    }

    doLogin() {
        const params = {
            name: this.name,
            password: this.password
        };
        this.router.navigate(['/habit/list']);
        this.apiService.excLogin(params).subscribe(({ code, msg, data }) => {
            if (code === 0) {
                const { userId } = data;
                localStorage.setItem('userId', userId);
            } else {
                alert(msg);
            }
        });
    }

}

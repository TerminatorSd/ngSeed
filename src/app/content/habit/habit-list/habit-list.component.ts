import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { ToastService } from 'ng-zorro-antd-mobile';

@Component({
    selector: 'habit-list',
    templateUrl: './habit-list.component.html',
    styleUrls: ['./habit-list.component.scss']
})

export class HabitListComponent implements OnInit {
    userId: string;
    habitList: {
        name: string;
        img: string;
    }[];
    showModal = false;
    habitId = '';
    punchContent = '';

    constructor(private router: Router, private apiService: ApiService, private toast: ToastService) { }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        if (!this.userId) {
            this.router.navigate(['/login']);
        }
        this.getHabitList();
    }

    popModal(id) {
        this.habitId = id;
        this.showModal = true;
    }

    getHabitList() {
        this.apiService.fetchHabitList(this.userId).subscribe(({ code, msg, data }) => {
            if (code === 0) {
                this.habitList = data || [];
            }
        });
    }

    doPunch() {
        if (!this.punchContent) {
            this.toast.offline('填点啥呗~_~!', 1000);
            return;
        }
        this.apiService.excPunch({
            userId: this.userId,
            habitId: this.habitId,
            word: this.punchContent,
            // img:
        }).subscribe(({ code, msg }) => {
            if (code === 0) {
                this.toast.success('打卡成功啦~', 2000);
                this.showModal = false;
            } else {
                this.toast.fail('出错咯,待会再来看看~', 2000);
            }
        });
    }

}

import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-zorro-antd-mobile';
import { ApiService } from 'src/app/service/api.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-habit-detail',
    templateUrl: './habit-detail.component.html',
    styleUrls: ['./habit-detail.component.scss']
})
export class HabitDetailComponent implements OnInit {
    habitId = '';
    habitName = '';
    habitHistoryList: { word, img, createTime }[] = [];
    punchContent = '';
    showModal = false;
    userId: string;
    today = new Date().toLocaleDateString();
    punchFlag = false;

    constructor(private apiService: ApiService, private toast: ToastService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        if (!this.userId) {
            this.router.navigate(['/login']);
        }
        this.route.queryParams.subscribe(({ id, name }) => {
            this.habitId = id;
            this.habitName = name;
            this.getHabitHistory();
        });
        console.log(this.habitId);
    }

    isToday(time) {
        const d = new Date(time.replace(/-/g, '/'));
        const todaysDate = new Date();
        if (d.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
            return true;
        } else {
            return false;
        }
    }

    getHabitHistory() {
        this.apiService.fetchHabitHistory({
            user_id: this.userId,
            habit_id: this.habitId
        }).subscribe(({ code, msg, data }) => {
            if (code === 0) {
                this.habitHistoryList = data;
                this.punchFlag = data[0] && this.isToday(data[0].createTime);
            } else {
                this.toast.fail('获取历史记录出错咯,待会再来看看~', 2000);
            }
        });
    }

    popModal() {
        this.showModal = true;
    }

    doPunch() {
        if (!this.punchContent) {
            this.toast.offline('填点啥呗~_~!', 1000);
            return;
        }
        this.apiService.excPunch({
            user_id: this.userId,
            habit_id: this.habitId,
            habit_name: this.habitName,
            word: this.punchContent,
            img: 'img',
            punch_flag: this.habitHistoryList[0] && this.isToday(this.habitHistoryList[0].createTime)
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

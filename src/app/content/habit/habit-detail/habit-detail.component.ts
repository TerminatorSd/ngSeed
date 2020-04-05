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
    habitHistoryList: {
        sample_id?: number; word: string; img: string;
        create_time: string; day: string; date: string; time: string;
    }[] = [];
    punchContent = '';
    showModal = false;
    userId: string;
    today = new Date().toLocaleDateString();
    hasPunched = false;
    // 图片选择相关变量
    files = [];
    multiple = false;
    multipleTab = 0;

    constructor(private apiService: ApiService, private toast: ToastService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        // if (!this.userId) {
        //     this.router.navigate(['/login']);
        // }
        this.route.queryParams.subscribe(({ id, name }) => {
            this.habitId = id;
            this.habitName = name;
            this.getHabitHistory();
        });
    }

    changeMultiple(value: number) {
        this.multipleTab = value;
    }

    fileChange(params) {
        console.log(params);
        const { files, type, index } = params;
        this.files = files;
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
                this.habitHistoryList = data || [];
                this.habitHistoryList.forEach(item => {
                    item.date = item.create_time
                        .split(' ')[0].split('-')
                        .filter((ele, index) => index > 0).join('-');
                    item.time = item.create_time
                        .split(' ')[1].split(':')
                        .filter((ele, index) => index < 2).join(':');
                });
                this.hasPunched = this.habitHistoryList[0] && this.isToday(this.habitHistoryList[0].create_time);
            } else {
                this.toast.fail('获取历史记录出错咯,待会再来看看~', 2000);
            }
        });
    }

    popModal() {
        if (this.hasPunched) {
            this.punchContent = this.habitHistoryList[0].word;
        }
        this.showModal = true;
    }

    doPunch() {
        if (!this.punchContent) {
            this.toast.offline('填点啥呗~_~!', 1000);
            return;
        }
        const params = this.hasPunched ? {
            sample_id: this.habitHistoryList[0].sample_id,
            word: this.punchContent,
            img: this.files[0].url
        } : {
                user_id: parseInt(this.userId, 10),
                habit_id: parseInt(this.habitId, 10),
                habit_name: this.habitName,
                word: this.punchContent,
                img: this.files[0].url,
            };
        const tempMethod = this.hasPunched ? 'updatePunch' : 'excPunch';
        this.apiService[tempMethod](params).subscribe(({ code, msg }) => {
            if (code === 0) {
                this.toast.success(`${this.hasPunched ? '更新' : '打卡'}成功啦~`, 2000);
                this.showModal = false;
                this.getHabitHistory();
            } else {
                this.toast.fail('出错咯,待会再来看看~', 2000);
            }
        });
    }
}

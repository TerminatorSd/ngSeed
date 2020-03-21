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
    habitId = '';
    newHabitName = '';
    showModal = false;
    habitImgList = ['ao', 'book', 'coding', 'dance', 'english', 'happy', 'mask', 'accounting', 'music', 'planet',
        'reading', 'skates', 'sun', 'water', 'veg', 'earth', 'yoga', 'yumao', 'zaoqi', 'zaoshui'];
    nowChosenIndex = -1;

    constructor(private router: Router, private apiService: ApiService, private toast: ToastService) { }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        // if (!this.userId) {
        //     this.router.navigate(['/login']);
        // }
        this.getHabitList();
    }

    getHabitList() {
        this.apiService.fetchHabitList(this.userId).subscribe(({ code, msg, data }) => {
            if (code === 0) {
                this.habitList = data || [];
            }
        });
    }

    goToDetail(id, name) {
        this.router.navigate(['/habit/detail'], { queryParams: { id, name } });
    }

    addHabit() {
        this.showModal = true;
    }

    choseOneImg(index) {
        this.nowChosenIndex = index;
    }

    confirmAdd() {
        if (!this.newHabitName || this.nowChosenIndex < 0) {
            this.toast.offline('填点啥呗~_~!', 1000);
            return;
        }
        this.apiService.addHabit({
            user_id: parseInt(this.userId, 10),
            habit_name: this.newHabitName,
            img: this.habitImgList[this.nowChosenIndex]
        }).subscribe(({ code, msg }) => {
            if (code === 0) {
                this.toast.success('添加成功🌶~', 2000);
                this.showModal = false;
                this.getHabitList();
            } else {
                this.toast.fail('后台接口还没好哟,待会再来看看~', 2000);
            }
        });
    }
}

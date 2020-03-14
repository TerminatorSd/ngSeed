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
    showModal = true;
    habitImgList = ['code', 'dui-grey', 'no-data', 'code', 'reading'];

    constructor(private router: Router, private apiService: ApiService, private toast: ToastService) { }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        if (!this.userId) {
            this.router.navigate(['/login']);
        }
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
}

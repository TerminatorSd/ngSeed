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
    punchContent = '';
    showModal = false;
    userId: string;

    constructor(private apiService: ApiService, private toast: ToastService, private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        if (!this.userId) {
            this.router.navigate(['/login']);
        }
        this.habitId = this.route.snapshot.params.id;
        console.log(this.habitId);
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
            userId: this.userId,
            habitId: this.habitId,
            word: this.punchContent,
            img: 'img'
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

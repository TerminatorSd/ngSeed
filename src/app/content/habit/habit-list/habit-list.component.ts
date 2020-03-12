import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-habit-list',
    templateUrl: './habit-list.component.html',
    styleUrls: ['./habit-list.component.scss']
})

export class HabitListComponent implements OnInit {
    userId: string;
    habitList: {
        name: string;
        img: string;
    }[];
    constructor(private router: Router, private apiService: ApiService) { }

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

    

}

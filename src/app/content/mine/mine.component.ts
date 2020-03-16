import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mine',
    templateUrl: './mine.component.html',
    styleUrls: ['./mine.component.scss']
})
export class MineComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    logOut() {
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
    }

}

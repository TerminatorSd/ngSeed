import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ngZorro';
    routerSub: Subscription;

    constructor(private loc: Location, private router: Router) { }

    ngOnInit() {
        // this.routerSub = this.router.events
        //     // .pipe(filter(event => event instanceof NavigationEnd)) //根据事件的类型进行过滤
        //     .subscribe((event) => {
        //         console.log(event);
        //         // your operation
        //         // this.ref.detectChanges(); //我的操作
        //     });
    }

    goBack() {
        // this.loc.back();
        this.router.navigate(['/content']);
    }
}

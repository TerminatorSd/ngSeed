import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
    hidden = false;
    tintColor = '#47c479';
    unselectedTintColor = '#888';
    selectedIndex = 0;

    constructor() { }

    ngOnInit() {
    }

    showTabBar(event) {
        event.preventDefault();
        this.hidden = !this.hidden;
    }

    showNextTabBar(event) {
        event.preventDefault();
        const PANE_COUNT = 4;
        if (this.selectedIndex == PANE_COUNT - 1) {
            this.selectedIndex = 0;
        } else {
            this.selectedIndex++;
        }
        console.log('selectedIndex: ', this.selectedIndex);
    }

    changePosition(event) {
        event.preventDefault();
        this.topFlag = !this.topFlag;
    }

    tabBarTabOnPress(pressParam: any) {
        console.log('onPress Params: ', pressParam);
        this.selectedIndex = pressParam.index;
    }

}

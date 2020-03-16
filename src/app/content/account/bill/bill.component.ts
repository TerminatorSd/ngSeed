import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

    billList: {
        time: string;
        day: string;
        list: { type: string; img: string; comment: string; money: number; income: boolean }[];
    }[];

    name2 = '选择';
    value2 = [];
    // value = [];
    name = '选择';
  value = new Date(2019, 4);

  currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }

  onOk(result: Date) {
    this.name = this.currentDateFormat(result);
    this.value = result;
  }


    constructor() { }

    ngOnInit() {
        this.billList = [
            {
                time: '2020-3-16',
                day: '周一',
                list: [
                    { type: '交通', img: 'traffic', comment: '坐公交', money: 6, income: false },
                    { type: '吃饭', img: 'eat', comment: '牛肉饭', money: 25, income: false }
                ]
            },
            {
                time: '2020-3-13',
                day: '周五',
                list: [
                    { type: '交通', img: 'traffic', comment: '坐公交', money: 6, income: false }
                ]
            }
        ]
    }


}

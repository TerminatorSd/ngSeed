import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import * as echarts from 'echarts';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
    @ViewChild('pieChart', { static: true }) pieChart;

    userId: string;
    echartIns: any;
    payType: number;
    searchType = 1;

    constructor(private router: Router, private apiService: ApiService, private toast: ToastService) { }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        this.echartIns = echarts.init(document.getElementById('pieChart'));
        this.getPieChartData();
    }

    getPieChartData() {
        this.apiService.fetchPieData({
            user_id: parseInt(this.userId, 10),
            date: '2020-03',
            search_type: this.searchType,
            pay: this.payType
        }).subscribe(({ code, msg, data }) => {
            if (code === 0) {
                this.echartIns.setOption({
                    series: {
                        type: 'pie',
                        data
                    }
                });
            } else {
                this.toast.fail('接口出错咯,待会再来看看~', 2000);
            }
        });
    }

    flag = true;

    onChange(item) {
        this.searchType = item.index;
        this.getPieChartData();
    }

    changePay(pay) {
        this.payType = pay ? 1 : 0;
        this.getPieChartData()
    }

    selectCard(e) {
        console.log(' ', JSON.stringify(e));
    }
}

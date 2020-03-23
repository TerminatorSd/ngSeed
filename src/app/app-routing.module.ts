import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HabitListComponent } from './content/habit/habit-list/habit-list.component';
import { HabitDetailComponent } from './content/habit/habit-detail/habit-detail.component';
import { ContentComponent } from './content/content.component';
import { BillComponent } from './content/account/bill/bill.component';
import { PieChartComponent } from './content/account/pie-chart/pie-chart.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'content', component: ContentComponent, canActivate: [AuthGuard] },
  { path: 'habit/detail', component: HabitDetailComponent, canActivate: [AuthGuard] },
  { path: 'account/bill', component: BillComponent, canActivate: [AuthGuard] },
  { path: 'account/pie', component: PieChartComponent, canActivate: [AuthGuard] },

//   { path: 'post/detail/:id', component: PostDetailComponent },
//   { path: 'reading', component: ReadingComponent },
//   { path: 'about', component: AboutComponent },
//   { path: 'manage/list', component: ManagePostListComponent },
//   { path: 'manage/detail/:id', component: ManagePostDetailComponent },
];

@NgModule({
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }

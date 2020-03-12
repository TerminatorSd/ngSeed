import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HabitListComponent } from './content/habit/habit-list/habit-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'habit/list', component: HabitListComponent },
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

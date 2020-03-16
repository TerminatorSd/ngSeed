import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

import { LoginComponent } from './login/login.component';
import { HabitListComponent } from './content/habit/habit-list/habit-list.component';
import { ContentComponent } from './content/content.component';
import { HabitDetailComponent } from './content/habit/habit-detail/habit-detail.component';
import { AccountListComponent } from './content/account/account-list/account-list.component';
import { MineComponent } from './content/mine/mine.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HabitListComponent,
    ContentComponent,
    HabitDetailComponent,
    AccountListComponent,
    MineComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgZorroAntdMobileModule
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

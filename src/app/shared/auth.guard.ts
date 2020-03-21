import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkLogin();
    }

    checkLogin(): boolean {
        // 判断本地有没有token
        const userId = localStorage.getItem('userId');
        // 如果token有值，表示登录成功，继续跳转，否则跳转到首页
        if (userId) { return true; }
        this.router.navigate(['/login']);
        return false;
    }

}

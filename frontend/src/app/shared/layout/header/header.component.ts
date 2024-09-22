import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavigationEnd, Router} from "@angular/router";
import {UserInfoType} from "../../../../types/user-info.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LinkType} from "../../../../types/link.type";
import {filter} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isActive: boolean = false;
  isLogged: boolean = false;
  userInfo: UserInfoType | null = null;

  links: LinkType[] = [
    { url: '/', fragment: 'services', name: 'Услуги'},
    { url: '/', fragment: 'about', name: 'О нас'},
    { url: '/blog', name: 'Статьи'},
    { url: '/', fragment: 'reviews', name: 'Отзывы'},
    { url: '/', fragment: 'contacts', name: 'Контакты'}
  ];

  activeLink: string = '';

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isLogged$
      .subscribe((isLoggedIn: boolean) => {
        this.isLogged = isLoggedIn;
        if(this.isLogged) {
          this.getUserInfo();
        }
      });

    this.activeLink = this.router.url === '/' ? '/#services' : this.router.url;
    console.log(this.activeLink);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      console.log(event);
      this.activeLink = (event as NavigationEnd).url;
      })
  }

  getUserInfo() {
    this.authService.getUserInfo()
      .subscribe((data: UserInfoType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        this.userInfo = data as UserInfoType;
      });
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      })
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

  getActiveLink(link: LinkType): boolean {
    return this.activeLink.includes(link.fragment || link.url);
  }

}

import { Component, HostListener, TemplateRef, inject } from '@angular/core';
import { iUserRegistered } from '../../Models/i-user-registered';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { iLogin } from '../../Models/i-login';
import { iUserRegister } from '../../Models/i-user-register';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  user: iUserRegistered | undefined;
  private modalService = inject(NgbModal);
  login: iLogin = {
    username: '',
    password: ''
  }
  registerData:iUserRegister = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  }

  constructor(
    private authSvc:AuthService,
    private router:Router) {}

  ngOnInit() {
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    })
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 30) {
      navbar?.classList.add('navbar-scrolled');
    } else {
      navbar?.classList.remove('navbar-scrolled');
    }
  }

  logout(){
    this.authSvc.logout();
  }

  signIn(){
    this.authSvc.login(this.login).subscribe()
  }

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

  isThisPage(page:string):boolean{
    return this.router.url === `/${page}`
  }

  signUp(){
    this.authSvc.loginUserAfterRegister(this.registerData)
  }

}

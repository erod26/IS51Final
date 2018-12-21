import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { Subject } from 'rxjs';

export interface IUser {
  id?: number;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  user: IUser = { username: 'eric', password: 'eric123' };
  currentUser: IUser = null;
  constructor(private router: Router, private toastService: ToastService) {
  }

  ngOnInit() {

  }

  login(user: IUser) {
    console.log('from login user', user);
    const defaultUser: IUser = { username: 'eric', password: 'eric123' };
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
        this.router.navigate(['cart', user]);
      } else {
        this.toastService.showToast('danger', 15000, 'Login failed! Please check your username or password!');
      }
    }

    }

  

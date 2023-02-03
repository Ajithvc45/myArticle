import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private route: Router, private _snackBar: MatSnackBar) {}
  user = {
    name: '',
    password: '',
  };
  snack = true;
  msg = "Incorrect Password or Username";
  action = "close";
  emptyMsg = "Please enter your Username and Password";
  durationInSeconds = 5;
  ngOnInit(): void {}

  login() {
    console.log(this.user);
    if (this.user.name == 'qwerty' && this.user.password == 'qwerty') {
      this.route.navigate(['/home']);
      localStorage.setItem("username",this.user.name)
    } else if(this.user.name != 'qwerty' || this.user.password != 'qwerty') {
      this.openSnackBar(this.msg, this.action)
    }
     if(this.user.name == '' && this.user.password == ''){
      this.openSnackBar(this.emptyMsg, this.action)
    }
  }

  openSnackBar(message: string, action: string) { 
    duration: this.durationInSeconds * 1000,
    this._snackBar.open(message,  action);
  }
}

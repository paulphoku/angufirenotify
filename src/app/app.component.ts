import { Component, OnInit } from '@angular/core';
import { MessagingService } from './shared/messaging.service';
import { ApisService } from './shared/apis.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  regForm: FormGroup; submitted = false; setError: string;
  message;

  constructor(
    private messagingService: MessagingService,
    private fb: FormBuilder,
    private apis: ApisService,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.regForm = this.fb.group({
      usr_fname: ['', Validators.required],
      usr_lname: ['', Validators.required],
      usr_tel: ['', Validators.required],
    });
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
  // convenience getter for easy access to form fields
  get f() { return this.regForm.controls; }

  get usr_tel() {
    return this.regForm.get('usr_tel');
  }

  get usr_fname() {
    return this.regForm.get('usr_fname');
  }

  get usr_lname() {
    return this.regForm.get('usr_lname');
  }

  register() {
    let dataset = this.regForm.value;

    //save to database
    this.apis.createUser(dataset)
      .then(
        res => {
          console.log(res);
          this.regForm.reset();
        }
      );

    //send text message
    this.apis.sendMessage(
      dataset.usr_fname,
      dataset.usr_lname,
      dataset.usr_tel
    ).subscribe(
      data => {
        if (data == 200) {
          console.log(data);
          this.toastr.success('User Created');
          console.log(this.apis.usr_token);
        } else {
          this.setError = data.message
        }
      },
      error => {
        //this.alert.error(error);
        console.log(error)
      }
    )

    //send text message
    this.apis.sendPush(
      this.apis.usr_token,
      'hello ' + dataset.usr_fname + ' ' +  dataset.usr_lname,
      'Application complete'
    ).subscribe(
      data => {
        if (data == 200) {
          console.log(data);
        } else {
          this.setError = data.message 
        }
      },
      error => {
        //this.alert.error(error);
        console.log(error)
      }
    )

  }



  revert() {
    this.regForm.reset();
  }

}

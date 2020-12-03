import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../srvs/admin.service';

@Component({
  selector: 'app-sendmail',
  templateUrl: './sendmail.component.html',
  styleUrls: ['./sendmail.component.sass']
})
export class SendmailComponent implements OnInit {

  constructor(public matDialogRef : MatDialogRef<SendmailComponent>,
              public admsrv: AdminService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.matDialogRef.close();
  }

}

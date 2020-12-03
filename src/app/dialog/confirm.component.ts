import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.sass']
})
export class ConfirmComponent implements OnInit {

  constructor(public matDialogRef : MatDialogRef<ConfirmComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.matDialogRef.close();
  }

}

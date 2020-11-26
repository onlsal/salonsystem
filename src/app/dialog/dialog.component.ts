import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              public matDialogRef : MatDialogRef<DialogComponent >) { }

  ngOnInit(): void {


  }
  onClickOkButton():void {
      this.matDialogRef.close();
  }
}

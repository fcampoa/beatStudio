import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {

  public message: string;

  constructor(public dialogRef: MatDialogRef<MessageModalComponent>,
              @Inject(MAT_DIALOG_DATA) public content: any) {

                this.message = this.content.message;
               }

  ngOnInit() {
  }

  onClick(): void {
    this.dialogRef.close();
  }
}

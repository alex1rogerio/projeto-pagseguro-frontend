import { PeriodicElement } from 'src/app/models/PeriodicElement';
import {Inject, Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {
  element: PeriodicElement;
  isChange: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: PeriodicElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>
  ) {}

  ngOnInit(): void {
    if(this.data.id !== null){
      this.isChange = true;
    }else{
      this.isChange = false;
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }

}
import { Component, OnInit, Inject,Input } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm.component';
import { MatDialogRef } from '@angular/material';
import {  MatDialog } from '@angular/material';
import { Service } from '../../service';
import {MatSnackBar} from '@angular/material/snack-bar'; 

@Component({
  templateUrl: 'template.html',
})

export class ViewDialogComponent implements OnInit{


  constructor(
    private _service: Service,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public _dialogRef: MatDialogRef<ViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){ 
  //  console.log(data); 
  }
  
  ngOnInit(){
    
  }

  action(type : String = "stock-in"){
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe((result) => {
        if(result){
            // console.log(result);
          
            this._service.action(type + "/" + this.data.id).subscribe(
              (res) => {
                this._snackBar.open(res.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000,panelClass: ['green-snackbar']});
              }, 
              (err) => {
                this._snackBar.open(err.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000,panelClass: ['red-snackbar']});
              }
            );
        }
    });
    }


}

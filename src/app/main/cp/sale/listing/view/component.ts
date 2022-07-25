import { Component, OnInit, Inject,Input } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm.component';
import { MatDialogRef } from '@angular/material';
import {  MatDialog } from '@angular/material';
import { Service } from '../../service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment as env } from 'environments/environment';

@Component({
  templateUrl: 'template.html',
})

export class ViewSaleDialogComponent implements OnInit{


  constructor(
    private _service: Service,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public _dialogRef: MatDialogRef<ViewSaleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){ 
  
  }
  
  ngOnInit(){
    
  }

  action(type : String = "accept"){
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe((result) => {
        if(result){

            this._service.action(type + "/" + this.data.id).subscribe(
              (res) => {
                this._dialogRef.close;
                this._snackBar.open(res.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000,panelClass: ['green-snackbar']});
              }, 
              (err) => {
                this._dialogRef.close;
                this._snackBar.open(err.error.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000,panelClass: ['red-snackbar']});
              }
            );
        }
      
    });
    dialogRef.close;
  }

  printOrderPDF(row: any = null) {

    let w = window.open('about:blank');
    w.document.body.appendChild(w.document.createElement('iframe')).src = env.apiUrl + '/printing/pdf/' + row;
    w.document.getElementsByTagName("iframe")[0].style.width = '100%';
    w.document.getElementsByTagName("iframe")[0].style.height = '100%';
    w.focus();

  }    


}

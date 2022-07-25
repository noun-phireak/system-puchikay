// ===================================================================>> Core Library
import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

// ===================================================================>> Third Library
import { MatSort, MatDialog, MatSnackBar } from '@angular/material';

// ===================================================================>> Custom Library
import { fuseAnimations } from '@fuse/animations';
import { Service } from '../service';

import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm.component';
import { FunctionService } from '../../../../helper/function.service';

import { ChangePasswordDialogComponent } from './change-password/component'; 

@Component({
    templateUrl  : './template.html',
    styleUrls: ['../../../../../assets/custom.scss', './style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ListingComponent implements OnInit
{
    
    public name:string          = '';
    public type:number          = 0; 
    public data:any[]           = [];
    public total:number         = 10;
    public limit:number         = 50;
    public page:number          = 1;
    public isSearching:boolean  = false;
    public key:string           = ''; 

    constructor(

        private _service: Service,
        private _router: Router,
        private _snackBar: MatSnackBar,
        private _dialog: MatDialog,
        private _route: Router, 
        public fs: FunctionService,

    ){}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void
    {
       this.listing(); 
       //this.confirmCreate(); 
       
    }

    openChangePasswordForm(row:any = null):void {

      const dialogRef = this._dialog.open(ChangePasswordDialogComponent, { data:row });
      dialogRef.afterClosed().subscribe((result) => {
        
        //console.log(result); 

       
      });

    }
   

    onDelete(row:any = null){

      //console.log(row);
      // const dialogRef = this._dialog.open(ConfirmDialogComponent);
      // dialogRef.afterClosed().subscribe((result) => {
      //   //console.log(result); 
      //   if(result){
          
      //     this._service.delete(row.id).subscribe((res) => {

      //       if(res.status == 'success'){
      //           this.listing();
      //           this._snackBar.open(res.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
      //       }
      //     });
      //   }
      // });

    }

    listing() {
        
      this.isSearching = true; 
        let params:any = { }
        
        if(this.key != ""){
            params.key = this.key; 
        }

        if(this.type != 0){
          params.type = this.type; 
        }

        // console.log(params); 

        this._service.listing(params).subscribe(res => {
            
            this.isSearching = false; 
            this.data = res;
            // console.log(this.data);
        })
       
    }

   

  
  

}


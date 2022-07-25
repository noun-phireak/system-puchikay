// ===================================================================>> Core Library
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// ===================================================================>> Third Library
import { MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
// ===================================================================>> Custom Library
import { fuseAnimations } from '@fuse/animations';
import { Service } from '../service';

import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm.component';

import { environment } from '../../../../../../environments/environment'; 

@Component({
    templateUrl  : './template.html',
    styleUrls: ['../../../../../../assets/custom.scss', './style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ListingComponent implements OnInit
{
    
    public key:string           = '';
    public type:number          = 0; 
    public types:any[]          = []; 
    public isSaving:boolean = false;
    public data:any[]           = [];
    public total:number         = 10;
    public limit:number         = 50;
    public page:number          = 1;
    public isSearching:boolean  = false; 
    public fileUrl:string       = environment.fileUrl; 

    constructor(

        private _service: Service,
        private _snackBar: MatSnackBar,
        private _dialog: MatDialog,
        private _router: Router

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
       //this.openCreateForm(); 

      //Get Product type
      this._service.getProductType().subscribe((res:any[]) => {
        this.types = res;
      })
       
    }

    onDelete(row:any = null){

      //console.log(row);
      const dialogRef = this._dialog.open(ConfirmDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        //console.log(result); 
        if(result){
          
          this._service.delete(row.id).subscribe((res) => {

            if(res.status == 'success'){
                this.listing();
                this._snackBar.open(res.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
            }
          });
        }
      });

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

        this._service.listing(params).subscribe(res => {
            
          this.isSearching = false; 
          this.data = res.data;
       
      })

       
    }

    acceptOrder(element){
      const dialogRef = this._dialog.open(ConfirmDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
          if(result){
              let data:any = {
                  code: element.code,
              }
              this._service.putAcceptOrder(data).subscribe(res => {
                  this.isSearching = false;
                  this._snackBar.open(res.message, 'Message',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
                  this._router.navigate([`/cp/order/`])
              })
              this._service.putAcceptOrder(data).subscribe(err =>{
                  this.isSearching = false;
                  this._snackBar.open(err.message, 'Message',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['red-snackbar']})
              })
          }
      });
  }

   

  
  

}


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
import { environment as env } from 'environments/environment';

import { ViewSaleDialogComponent } from './view/component'; 

@Component({
    templateUrl  : './template.html',
    styleUrls: ['../../../../../assets/custom.scss', './style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ListingComponent implements OnInit
{
    public receipt_number:string ='';
    public name:string          = '';
    public status:number        = 0;
    public statusType:any[]     = []; 
    public data:any[]           = [];
    public total:number         = 10;
    public limit:number         = 10;
    public page:number          = 1;
    public isSearching:boolean  = false; 

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
       this.getStatus();
       //this.confirmCreate(); 
     
       
    }





    viewReceipt(row:any = null):void {

      const dialogRef = this._dialog.open(ViewSaleDialogComponent, { data:row });
      dialogRef.afterClosed().subscribe((result) => {

        if(result){
      
        }
          
      });

    }
   getStatus(){
    this._service.getStatus().subscribe((res) =>{
      console.log(res);
      this.statusType = res.data;
     },err=>{});
   }

    onDelete(row:any = null){

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
        
        this.isSearching  = true; 
        let params:any = {
            limit: this.limit,
            page: this.page
        }

        
        if(this.receipt_number != ""){
            params.receipt_number = this.receipt_number; 
        }

        if(this.status != 0){
          params.status = this.status; 
        }

        this._service.listing(params).subscribe(res => {

            this.isSearching = false; 
            this.data = res.data;
            
            this.total = res.total;
            this.page  = res.current_page;
            this.limit = res.per_page;
        })
       
    }

    onPageChanged(event) {
      if (event && event.pageSize) {
          this.limit = event.pageSize;
          this.page = event.pageIndex + 1;
          this.listing();
      }

    }

    printOrderPDF(row: any = null) {

      let w = window.open('about:blank');
      w.document.body.appendChild(w.document.createElement('iframe')).src = env.apiUrl + '/printing/pdf/' + row;
      w.document.getElementsByTagName("iframe")[0].style.width = '100%';
      w.document.getElementsByTagName("iframe")[0].style.height = '100%';
      w.focus();
  
    }



   

  
  

}


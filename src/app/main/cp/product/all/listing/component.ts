// ===================================================================>> Core Library
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// ===================================================================>> Third Library
import { MatSort, MatDialog, MatSnackBar } from '@angular/material';

// ===================================================================>> Custom Library
import { fuseAnimations } from '@fuse/animations';
import { Service } from '../service';

import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm.component';

import { CreateDialogComponent } from './create/component'; 
import { EditDialogComponent } from './edit/component'; 

import { environment } from '../../../../../../environments/environment'; 

@Component({
    templateUrl  : './template.html',
    styleUrls: ['../../../../../../assets/custom.scss', './style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ListingComponent implements OnInit
{   
    public name:string = "";
    public params:any;
    public key:string           = '';
    public type:number          = 0; 
    public types:any[]          = []; 
    public supplier:any[]          = []; 
    public data:any[]           = [];
    public total:number         = 10;
    public limit:number         = 10;
    public page:number          = 1;
    public isSearching:boolean  = false; 
    public fileUrl:string       = environment.fileUrl; 

    constructor(

        private _service: Service,
        private _snackBar: MatSnackBar,
        private _dialog: MatDialog,

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

      //Get Product type
      this._service.getProductType().subscribe((res:any[]) => {
        this.types = res;
      }),
      this._service.getSupplier().subscribe((res:any[]) =>{
        this.supplier = res;
      })
       
    }

    openCreateForm():void {

      const dialogRef = this._dialog.open(CreateDialogComponent, { data:{ types: this.types,supplier:this.supplier} });
      dialogRef.afterClosed().subscribe((result) => {
        

        if(result){
            
          this.listing(); 
        }
          
      });

    }

    openEditForm(row:any = null):void {

      const dialogRef = this._dialog.open(EditDialogComponent, { data:{ row: row, types: this.types,supplier:this.supplier } });
      dialogRef.afterClosed().subscribe((result) => {
        

        if(result){
            
          this.listing(); 
        }
          
      });

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

    listing(limit: number = 10, page: number = 1) {
      
        this.isSearching = true; 
        this.params = { 
            limit: limit,
            page: page
        }
        
        if(this.name != ""){
            this.params.name = this.name; 
        }

        if(this.type != 0){
          this.params.type = this.type; 
        }


        this._service.listing(this.params).subscribe(res => {
            
            this.isSearching = false; 
            this.data = res.data;
            this.total = res.total;
            this.page  = res.current_page;
            this.limit = res.per_page;
        });
       
    }

    onPageChanged(event) {
      if (event && event.pageSize) {
          this.limit = event.pageSize;
          this.page = event.pageIndex + 1;
          this.listing(this.limit, this.page);
      }

  }

   

  
  

}


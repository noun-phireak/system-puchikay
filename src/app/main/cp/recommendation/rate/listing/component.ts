// ===================================================================>> Core Library
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

// ===================================================================>> Third Library
import { MatDialog, MatSnackBar } from '@angular/material';

// ===================================================================>> Custom Library
import { fuseAnimations } from '@fuse/animations';
import { Service } from '../service';

@Component({
    templateUrl  : './template.html',
    styleUrls: ['../../../../../../assets/custom.scss', './style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ListingComponent implements OnInit
{
    public nOfReview:number  = 0;
    public nOfProduct:number  = 0;
    public name:string          = '';
    public type:number          = 0; 
    public data:any[]           = [];
    public total:number         = 10;
    public limit:number         = 50;
    public page:number          = 1;
    public isSearching:boolean  = false; 

    constructor(

        private _service: Service,

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

  listing() {
      
      this.isSearching = true; 
      let params:any = { }
      this._service.listing(params).subscribe(res => {
          
          this.isSearching = false; 
          this.data = res;
          this.data.forEach(e=>{
            this.nOfProduct += e.n_of_products;
        })
        this.data.forEach(e=>{
            this.nOfReview += e.n_of_reviews;
        })
         
      })
      
  }
  

}

   

  
  




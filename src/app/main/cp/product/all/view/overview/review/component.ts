import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { fuseAnimations } from '@fuse/animations';
import { Service } from '../../../service';


@Component({
    selector: 'review-product',
    templateUrl  : './template.html',
    styleUrls: ['../../../../../../../../assets/custom.scss', './style.scss'],
    // styleUrls:['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations, 
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
      }]
})
export class ReviewComponent implements OnInit
{

  @Input() id;
  @Input() data;
  public isSearching:boolean = false;
  
    constructor(
      private _service: Service,

    ){
       
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(){
      
      
    }


  //   listing() {
        
  //     this.isSearching = true; 
  //     let params:any = { }
  //     this._service.getBooking(this.id).subscribe(res => {
  //         this.isSearching = false; 
  //         this.data = res;
  //         console.log(this.data);
          
  //     })
     
  // }
     
}

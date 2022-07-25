import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fuseAnimations } from '@fuse/animations';
import { Service } from '../service';

@Component({
    templateUrl  : './template.html',
    styleUrls:['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations, 
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
      }]
})
export class ViewProductComponent implements OnInit
{
    public data:any; 
    public isLoading:boolean=false;
    // public code:string ='';
    constructor(
        private _service: Service,
        private _activatedRoute: ActivatedRoute, 
        private _snackBar: MatSnackBar
    ){}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void
    {
        // this.getData();
        let id        = this._activatedRoute.snapshot.params['id'];
        this.isLoading=true;
        this._service.viewProduct(id).subscribe(res => {
            this.isLoading = false; 
            this.data = res;
        });
    }

}

    
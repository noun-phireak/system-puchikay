import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fuseAnimations } from '@fuse/animations';
import { Service } from '../../service';
import { Input } from '@angular/core';
import { FunctionService } from '../../../../../../../app/helper/function.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { Router } from '@angular/router';


@Component({
    selector: 'overview-officer',
    templateUrl  : './template.html',
    // styleUrls:['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations, 
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
      }]
})
export class ProductOverviewComponent implements OnInit
{
    public form : FormGroup;
    public mode : any;
    public type: any;
    public types: any;
    public supplier: any[]      = [];
    @Input() data;
    @Input() id;
    public isLoading:boolean = false;
    public src: string = 'assets/mpwt/person-placeholder.jpg'; 
    constructor(
        private service: Service,
        private validatorService: ValidatorService,
        private _formBuilder: FormBuilder,
        private route: Router,
        private _snackBar: MatSnackBar,
        public fs: FunctionService
    ){
      
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
     ngOnInit(){
        this._buildForm(); 
        if(this.data){
          this.src = this.fs.imgUrl(this.data.image);
      }
      }
      
    
      submit(){
    
        if(this.form.valid){
        
          this.isLoading = true; 
          this.service.update(this.data.overview.id, this.form.value).subscribe( 
            // ========================>> HTTP Success Response 200
            (res: any) =>{ 
              
             
              this.isLoading = false; 
              this._snackBar.open(res.message, 'Message', {verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
             
            },  
    
            // ========================>> HTTP Error Response
            err => {  
              this.isLoading = false; 
              this._snackBar.open('Please try again.', 'Message', {verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['red-snackbar']});
            }
          );
        }else{
          this._snackBar.open('Please check your input.', 'Message', {verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['red-snackbar']});
        }
       
       
    
    
      }
    
      private _buildForm() {
    
        this.form = new FormGroup({
          name: new FormControl(this.data.overview.name, [ Validators.required ]),
          unit_price: new FormControl(this.data.overview.unit_price, [ Validators.required]),
          discount: new FormControl(this.data.overview.discount, [ Validators.required, Validators.max(100)]), 
          category_id: new FormControl(this.data.overview.category_id, [ Validators.required]),
          supplier_id: new FormControl(this.data.overview.supplier_id, [ Validators.required]),
          image: new FormControl('')
        });
    
    }
    srcChange(src, i){
      this.form.get('image').setValue(src); 
  }
  
}

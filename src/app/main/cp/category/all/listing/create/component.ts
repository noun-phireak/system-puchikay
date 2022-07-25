import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from '../../service';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  templateUrl: 'template.html',
})

export class CreateDialogComponent implements OnInit{

  public form: FormGroup;
  public types:any[]          = []; 
  public isSaving:boolean = false;
  public supplier:any[] = [];
  public src: string = 'assets/mlm/school.png'; 
  public mode:any;

  constructor(
    private _service: Service,
    private _snackBar: MatSnackBar, 
    public _dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){ 

   this.types = data.types;
   this.supplier = data.supplier;
  
  }
  
  ngOnInit(){

    this._buildForm(); 
    
  }


  save(){

    if(this.form.valid){
    
      this.isSaving = true; 
      this._service.create(this.form.value).subscribe( 

        // ========================>> HTTP Success Response 200
        (res: any) =>{ 
          
          this.isSaving = false; 
          this._snackBar.open(res.message, 'Message', {verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
          this._dialogRef.close(res); 
        },  

        // ========================>> HTTP Error Response
        err => {  
          this.isSaving = false; 
          this._snackBar.open('Please try again.', 'Message', {verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['red-snackbar']});
        }

      );

    }else{

      this.form.markAllAsTouched();
      this._snackBar.open('Please check your input.', 'Message', {verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['red-snackbar']});
    
    }

  }

  private _buildForm() {

    this.form = new FormGroup({
      name: new FormControl('', [ Validators.required ]),
      image: new FormControl('',[])
    });}

    srcChange(src, i){
      this.form.get('image').setValue(src); 
    }

}

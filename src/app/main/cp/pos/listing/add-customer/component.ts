import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from '../../service';
import { getType } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  templateUrl: 'template.html',
})

export class CreateDialogComponent implements OnInit{

  public form: FormGroup;
  public isSaving:boolean = false;
  public customer: any[]      = [];
  


  constructor(
    private _service: Service,
    private _snackBar: MatSnackBar, 
    public _dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){ 
   
  }
  
  ngOnInit(){
    this._buildForm(); 
    this.getType();

  }

  onSelectChange($event){
    //console.log($event);
    this._dialogRef.close($event.value); 
  }


  select(){

    this._dialogRef.close(true); 

  }

  getType(){
    this._service.getCustomer().subscribe(res => {
        this.customer = res;
    });

    console.log('hello',this.customer)
}

  private _buildForm() {

    this.form = new FormGroup({
      customer_id : new FormControl(0, [ Validators.required]),

     
    });

}


}

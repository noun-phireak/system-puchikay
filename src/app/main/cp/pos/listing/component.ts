// ===================================================================>> Core Library
import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

// ===================================================================>> Third Library
import { MatSort, MatDialog, MatSnackBar } from '@angular/material';
import * as moment from 'moment';

// ===================================================================>> Custom Library
import { fuseAnimations } from '@fuse/animations';
import {environment as env} from '../../../../../environments/environment';
import { Service } from '../service';

import { ViewDialogComponent } from './view/view.dialog.component'; 

import {CreateDialogComponent} from './add-customer/component';
@Component({
    templateUrl  : './template.html',
    styleUrls:['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ListingComponent implements OnInit
{
    
    public isSearching:boolean  = false; 
    public data:any[] = []; 
    public fileUrl = env.fileUrl; 
    public discount:number = 0;
    public time:string = ''; 
    public cashier:string = ''; 
    public customer:any = null; 
    public key:string = '';
  


    constructor(

        private _service: Service,
        private _router: Router,
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
       this.cashier = localStorage.getItem('name'); 
       this.listing();
    }

    public getOutput($event){
      this.addToCart($event, 1); 
    }

    // =================================  >> Add to cart
    public cart:any[] = []; 
    addToCart(incomingItem:any, qty = 0){
      //console.log(incomingItem); 

      let isExisting:boolean = false; 
      let item:any = {
        id: incomingItem.id,
        name: incomingItem.name, 
        qty: qty, 
        temp_qty: qty, 
        unit_price: incomingItem.unit_price, 
      }; 
      
      //Check if Cart is not empty
      if(this.cart.length > 0){

        //console.log('Cart is not empty.'); 
        let j = 0; 

        //Loop inside the cart to find existing item; 
        this.cart.forEach(cartItem => {
          

          if( cartItem['id'] == incomingItem.id ){

            // console.log('Existing'); 
            // console.log('Current qty:'+parseInt(cartItem['qty'])); 
            isExisting = true;
            this.cart[j]['qty'] = parseInt(cartItem['qty']) + qty; 
            this.cart[j]['temp_qty'] = parseInt(cartItem['qty']); 
            
            //console.log('After qty:'+this.cart[j]['qty']); 
          }

          j++;

        })

      }else{
        //console.log('Cart is EMPTY!.'); 
      }

      
  
      if(!isExisting){
        this.cart.push(item); 
      }

      //console.log(this.cart); 

      this.getTotalPrice(); 
  
    }

    // ===============================>> Get total price
    public totalPrice: number = 0;
    getTotalPrice(){
  
      let total = 0;
      this.cart.forEach(item => {
  
        total += parseInt(item.qty) * parseInt(item.unit_price); 
       
        
      }); 
  
      this.totalPrice = total; 
    }

    // ================================>> Sub value 
    blur(event: any, index:number = -1){

      const tempQty = this.cart[index]['qty']; 
      if(event.target.value > 1000){
        event.target.value = 1000; 
      }

      if(!event.target.value){
        this.cart[index]['qty'] = tempQty; 
        this.cart[index]['temp_qty'] = tempQty; 
      }else{
        this.cart[index]['qty'] = parseInt(event.target.value);
        this.cart[index]['temp_qty'] = parseInt(event.target.value);
      }
  
      this.getTotalPrice();


    }

    // =================================>> Remove
    remove(index:number = -1){
      this.cart.splice(index, 1);
      this.getTotalPrice(); 
    }

    openCreateForm(row:any = null):void {

      const dialogRef = this._dialog.open(CreateDialogComponent, { data: row });
      dialogRef.afterClosed().subscribe((result) => {
        
        if(result !=""){

            this.customer = result; 
         
        }else{
          this.customer = 1;
        }
          
      });

    }
    // ================================>> CheckOut
    public isOrderBeingMade:boolean =  false; 

    checkOut(){

      if(this.customer != null){
        console.log(this.customer);
        let cart:any = {}; 
        for(let i = 0; i < this.cart.length; i++){
          cart[this.cart[i].id] = this.cart[i].qty;  
        }

      
        let data = {
            cart: JSON.stringify(cart), 
            discount: this.discount,
            customer_id: this.customer.customer.id
        }

        this.isOrderBeingMade = true; 
        this.time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); 
        this._service.checkOut(data).subscribe(
        
          //========================>> Success
          res=>{

              this.isOrderBeingMade = false; 
              this._snackBar.open(res.message, 'Message',{verticalPosition:"bottom", horizontalPosition:"center", duration:5000, panelClass: ['green-snackbar']});
              this.cart = []; 
              
            this._dialog.open(ViewDialogComponent, {data:res.order});

          }, 

          //========================>> Success
          err => {
              
              this.isOrderBeingMade = false; 
              this._snackBar.open('សូមព្យាយាមម្តងទៀត', 'Message',{verticalPosition:"bottom", horizontalPosition:"center", duration:5000, panelClass: ['red-snackbar']});
          
        })
      }else{

        console.log(this.customer);

        let cart:any = {}; 
        for(let i = 0; i < this.cart.length; i++){
          cart[this.cart[i].id] = this.cart[i].qty;  
        }

      
        let data = {
            cart: JSON.stringify(cart), 
            discount: this.discount,
            customer_id: this.customer
        }

        this.isOrderBeingMade = true; 
        this.time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); 
        this._service.checkOut(data).subscribe(
        
          //========================>> Success
          res=>{

              this.isOrderBeingMade = false; 
              this._snackBar.open(res.message, 'Message',{verticalPosition:"bottom", horizontalPosition:"center", duration:5000, panelClass: ['green-snackbar']});
              this.cart = []; 
              
            this._dialog.open(ViewDialogComponent, {data:res.order});

          }, 

          //========================>> Success
          err => {
              
              this.isOrderBeingMade = false; 
              this._snackBar.open('សូមព្យាយាមម្តងទៀត', 'Message',{verticalPosition:"bottom", horizontalPosition:"center", duration:5000, panelClass: ['red-snackbar']});
          
        })
       // this._snackBar.open('Pleasae select a customer.', 'Message',{verticalPosition:"bottom", horizontalPosition:"center", duration:5000, panelClass: ['red-snackbar']});
      } 
     
    }

    listing() {

      this.isSearching = true; 
      let params:any = { }
      
      if(this.key != ""){
          params.key = this.key; 
      }

      
      this._service.listing(params).subscribe(res => {
  
          this.isSearching = false; 
          this.data = res;
         
      });
     
  }

}


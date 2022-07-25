import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { fuseAnimations } from '@fuse/animations';
import { Service } from './service';
import { single } from './data';
import { environment as env } from 'environments/environment';


@Component({
    selector     : 'project-dashboard',
    templateUrl  : './template.html',
    styleUrls    : ['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DashboardComponent implements OnInit
{
    public data:any       = null;

    public orderData: any;

    single: any[];
    multi: any[];
  
    view: any[] = [500, 250];
  
    // options
    gradient: boolean = true;
    showLegend: boolean = true;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
    legendPosition: string = 'below';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      };

    /**
     * Constructor
     *
     */
    constructor(
        private _service: Service
    )
    {
        Object.assign(this,{single})
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
     ngOnInit(): void
     {
        this.listing();
        this.recentOrder();
     }

     recentOrder(){
      this._service.recentOrder().subscribe(res =>{
        this.orderData = res;
      },err=>{});
     }

    printOrderPDF(row: any = null) {

      let w = window.open('about:blank');
      w.document.body.appendChild(w.document.createElement('iframe')).src = env.apiUrl + '/printing/pdf/' + row;
      w.document.getElementsByTagName("iframe")[0].style.width = '100%';
      w.document.getElementsByTagName("iframe")[0].style.height = '100%';
      w.focus();
  
    }
    onSelect(){

    }
    onActivate(){

    }
    onDeactivate(){
      
    }
     listing() {
         
         this._service.dashboard().subscribe(res => {
             
             this.data = res;
             
         });
        
     }

     graph(){
      this._service.graph().subscribe(res =>{}, err=>{});
     }


}


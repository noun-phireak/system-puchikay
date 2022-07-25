import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    {
        path: '',
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
    },

    // ==========================================================================================>> Dashboard
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/module').then(m=>m.ProjectDashboardModule),
    },

   
    
    // ==========================================================================================>> Product
    {
        path: 'products',
        loadChildren: () => import('./product/all/module').then(m=>m.Module),
    },
  

    // ==========================================================================================>> Sale
    {
        path: 'sales',
        loadChildren: () => import('./sale/module').then(m=>m.SaleModule),
    },

];

@NgModule({
    declarations: [
        
    ],
    imports     : [
        RouterModule.forChild(routes),
    ],

    schemas: [
    ],

    providers   : [
     
    ], 
    entryComponents: [
    ]
})
export class SupplierModule
{

}


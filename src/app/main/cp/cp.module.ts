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

    // ==========================================================================================>> POS
    {
        path: 'pos',
        loadChildren: () => import('./pos/module').then(m=>m.Module),
    },

       // ==========================================================================================>> Purchase-Request
       {
        path: 'purchase/create',
        loadChildren: () => import('./stock-request/module').then(m=>m.PurchaseModule),
    },
    
    
    // ==========================================================================================>> Product
    {
        path: 'products',
        loadChildren: () => import('./product/all/module').then(m=>m.Module),
    },
    {
        path: 'status',
        loadChildren: () => import('./status/module').then(m=>m.Module),
    },
    {
        path: 'categories',
        loadChildren: () => import('./category/all/module').then(m=>m.Module),
    },
    {
        path: 'supplier',
        loadChildren: () => import('./supplier/all/module').then(m=>m.Module),
    },
    // ==========================================================================================>> Sale
    {
        path: 'sales',
        loadChildren: () => import('./sale/module').then(m=>m.SaleModule),
    },
    {
        path: 'stock',
        loadChildren: () => import('./stock/module').then(m=>m.Module),
    },
    {
        path: 'order',
        loadChildren: () => import('./order/all/module').then(m=>m.Module),
    },

    // ==========================================================================================>> User
    {
        path: 'customers',
        loadChildren: () => import('./user/module').then(m=>m.Module),
    },
     // ==========================================================================================>> Recommendation Rate
     {
        path: 'rate',
        loadChildren: () => import('./recommendation/rate/module').then(m=>m.Module),
    },
    // ==========================================================================================>> Recommendation Top Sale
    {
        path: 'top/sale',
        loadChildren: () => import('./recommendation/top-sale/module').then(m=>m.Module),
    },
    // ==========================================================================================>> Recommendation Top Review
    {
        path: 'top/review',
        loadChildren: () => import('./recommendation/top-review/module').then(m=>m.Module),
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
export class CPModule
{

}


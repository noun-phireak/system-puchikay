import { FuseNavigation } from '@fuse/types';

export const cpNavigation: FuseNavigation[] = [
   
    {
        id       : 'applications',
        title    : 'Menus',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [

            //===================================>> Dashboard
            {
                id       : 'dashboard',
                title    : 'Dashboard',
                translate: 'Dashboard',
                type     : 'item',
                icon     : 'dashboard',
                url      : '/cp/dashboard',
                children : [],
            }, 
            {
                id       : 'Category',
                title    : 'ផលិតផល',
                translate: 'ផលិតផល',
                type     : 'collapsable',
                icon     : 'category',
                children : [
                    {
                        id      : 'product-type',
                        title   : 'ប្រភេទផលិតផល',
                        translate: 'ប្រភេទផលិតផល',
                        type    : 'item',
                        icon     : 'keyboard_arrow_right',
                        url     : '/cp/categories'
                    },
                    {
                        id       : 'all-product',
                        title    : 'ផលិតផលទាំងអស់',
                        translate: 'ផលិតផលទាំងអស់',
                        type     : 'item',
                        icon     : 'keyboard_arrow_right',
                        url      : '/cp/products'
                    }               
                ]
            }, 

            // {
            //     id       : 'Recommendation',
            //     title    : 'Recommendation',
            //     translate: 'Recommendation',
            //     type     : 'collapsable',
            //     icon     : 'category',
            //     children : [
            //         {
            //             id      : 'Rate',
            //             title   : 'Rate',
            //             translate: 'Rate',
            //             type    : 'item',
            //             icon     : 'keyboard_arrow_right',
            //             url     : '/cp/rate'
            //         },
            //         {
            //             id       : 'Top Sale',
            //             title    : 'Top Sale',
            //             translate: 'Top Sale',
            //             type     : 'item',
            //             icon     : 'keyboard_arrow_right',
            //             url      : '/cp/top/sale'
            //         },
            //         {
            //             id       : 'Top Review',
            //             title    : 'Top Review',
            //             translate: 'Top Review',
            //             type     : 'item',
            //             icon     : 'keyboard_arrow_right',
            //             url      : '/cp/top/review'
            //         }              
            //     ]
            // }, 

            {
                id       : 'Sale',
                title    : 'គ្រប់គ្រងការលក់',
                translate: 'គ្រប់គ្រងការលក់',
                type     : 'collapsable',
                icon     : 'store',
                children : [
                    {
                        id       : 'all-product',
                        title    : 'ការលក់',
                        translate: 'ការលក់',
                        type     : 'item',
                        icon     : 'keyboard_arrow_right',
                        url      : '/cp/sales'
                    },
                    {
                        id       : 'pos',
                        title    : 'POS',
                        translate: 'POS',
                        type     : 'item',
                        icon     : 'keyboard_arrow_right',
                        url      : '/cp/pos',
                    }, 
                    {
                        id      : 'product-type',
                        title   : 'ស្ថានភាព',
                        translate: 'ស្ថានភាព',
                        type    : 'item',
                        icon     : 'keyboard_arrow_right',
                        url     : '/cp/status'
                    }
                ]
            }, 
    
            //===================================>> Stock
            {
                id       : 'Stock',
                title    : 'គ្រប់គ្រងស្តុក',
                translate: 'គ្រប់គ្រងស្តុក',
                type     : 'collapsable',
                icon     : 'people',
                children : [
                    {
                        id       : 'all-product',
                        title    : 'បញ្ជាទិញ',
                        translate: 'បញ្ជាទិញ',
                        type     : 'item',
                        icon     : 'keyboard_arrow_right',
                        url      : '/cp/stock'
                    }, 
                    {
                        id       : 'all-product',
                        title    : 'ការបញ្ជាទិញ',
                        translate: 'ការបញ្ជាទិញ',
                        type     : 'item',
                        icon     : 'keyboard_arrow_right',
                        url      : '/cp/purchase/create'
                    }, 
                    {
                        id      : 'product-type',
                        title   : 'អ្នកផ្គត់ផ្គង់',
                        translate: 'អ្នកផ្គត់ផ្គង់',
                        type    : 'item',
                        icon     : 'keyboard_arrow_right',
                        url     : '/cp/supplier'
                    }
                ]
            },

              //===================================>> Customer
              {
                id       : 'customer',
                title    : 'អតិថិជន',
                translate: 'អតិថិជន',
                type     : 'item',
                icon     : 'supervisor_account',
                url      : '/cp/customers',
                permission: ''
            },
            {
                id       : 'my-profile',
                title    : 'My Profile',
                translate: 'My Profile',
                type     : 'item',
                icon     : 'person',
                url      : '/my-profile',
                permission: ''
            },
        ],
    },
    
];

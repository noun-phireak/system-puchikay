import { FuseNavigation } from '@fuse/types';
import { cpNavigation } from './cp.navigation';

const role = localStorage.getItem('role'); 

let tempNav:FuseNavigation[] = []; 
if(role == 'Admin'){
    tempNav = cpNavigation; 
}else if(role == 'Supplier'){
    // tempNav = supplierNavigation; 
}

export const navigation: FuseNavigation[] = tempNav; 

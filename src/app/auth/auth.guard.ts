import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = Inject(Router)

  let isLoggedIns = localStorage.getItem("isLoggedIn")

  if(isLoggedIns == "true"){
    return true;
  }else{
    router.navigate(['/login'])
    return false
  }
  
  
  
};

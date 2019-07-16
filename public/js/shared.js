'use strict'

// Clear local Storage Function
function clearLocalStorage(){
    localStorage.clear();
    location.reload();
}

// Append Leading Zeros Function for Date
function addZero(n){
    if(n <= 9){
        return "0" + n;
    }
    return n
}
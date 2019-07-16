'use strict'
        
// Handlebars
/* Notes:
    - auslesen des Templates
    - Template ist nur ein String, durch das compile() wird daraus eine Template-Function
*/
const templateSource = document.getElementById("grid-entry-template").innerHTML;
const template = Handlebars.compile(templateSource);

// Clear local Storage Function
function clearLocalStorage(){
    if(confirm("Do you really want to do this?")){
        localStorage.clear();
        location.reload();
    } else{
        return false;
    }
}

// Add eventListener 
document.querySelector('#add-task').addEventListener('click', setTasks);
document.querySelector('#clear-storage').addEventListener('click', clearLocalStorage);
document.querySelector('#sort-due').addEventListener('click', sortTasks);
document.querySelector('#sort-date').addEventListener('click', sortTasks);
document.querySelector('#sort-prio').addEventListener('click', sortTasks);

document.addEventListener('DOMContentLoaded', function() {
    renderTodos();
 }, false);
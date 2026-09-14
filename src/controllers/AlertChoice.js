import Swal from "sweetalert2";

function toastChoice(title, callback) {
  Swal.mixin({
    toast: true,
    position: "bottom",
    confirmButtonColor:"#1972d6",
    confirmButtonText:"Yes",
    showCancelButton:true
  }).fire(title, "", "info").then(callback);
  
  return true;
}

export {toastChoice}
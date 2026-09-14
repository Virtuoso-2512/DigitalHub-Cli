import Swal from "sweetalert2";

function toast(title, icon = 0, text = "", timer = undefined) {
  const icons = ["error", "success", "warning", "info"];

  Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: timer === undefined ? 5000 : timer,
    timerProgressBar: true,
    didOpen: (toast) => { toast.addEventListener('mouseenter', Swal.stopTimer);toast.addEventListener('mouseleave', Swal.resumeTimer) } 
  }).fire(title, text, icons[icon]);
  
  return true;
}

export default toast;
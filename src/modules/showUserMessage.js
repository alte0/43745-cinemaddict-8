import toastr from "toastr";

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": `toast-bottom-center`,
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": `300`,
  "hideDuration": `1000`,
  "timeOut": `5000`,
  "extendedTimeOut": `1000`,
  "showEasing": `swing`,
  "hideEasing": `linear`,
  "showMethod": `fadeIn`,
  "hideMethod": `fadeOut`
};

const showInfoMessage = (message, title = ``) => {
  if (title) {
    toastr[`info`](message, title);
  } else {
    toastr[`info`](message);
  }
};

export {showInfoMessage};

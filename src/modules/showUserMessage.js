import toastr from "toastr";

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": `toast-top-center`,
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
/**
 * @param {String} type (`info`, `success`, `Warning`, `Error`)
 * @param {String} message
 * @param {String} title
 */
const showInfoMessage = (type, message, title = ``) => {
  if (title) {
    toastr[type](message, title);
  } else {
    toastr[type](message);
  }
};

const TypeMessage = {
  INFO: `info`,
  SUCCESS: `success`,
  WARNING: `warning`,
  ERROR: `error`
};

export {showInfoMessage, TypeMessage};

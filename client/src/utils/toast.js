import { toast } from "react-toastify";

const defaultOptions = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};
const showSuccess = (message) => {
  toast.success(message, defaultOptions);
};

const showWarning = (message) => {
  toast.warning(message, defaultOptions);
};

const showError = (message) => {
  toast.error(message, defaultOptions);
};

const showInfo = (message) => {
  toast.info(message, defaultOptions);
};

export { showSuccess, showWarning, showError, showInfo };
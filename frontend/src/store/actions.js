import { toast } from "react-toastify";
import { LOGIN, LOGOUT } from "./actionTypes";

export const storeToken = token => dispatch => {
  dispatch({ type: LOGIN, payload: token });
  toast.success("Successful logged in!", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};

export const logOut = () => dispatch => {
  dispatch({ type: LOGOUT });
  toast.error("Successful logged out !", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};

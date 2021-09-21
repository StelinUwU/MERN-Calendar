import Swal from "sweetalert2/dist/sweetalert2.js";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const response = await fetchWithoutToken(
      "auth/login",
      { email, password },
      "POST"
    );
    const body = await response.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const response = await fetchWithoutToken(
      "auth/register",
      { name, email, password },
      "POST"
    );
    const body = await response.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startCheking = () => {
  return async (dispatch) => {
    const response = await fetchWithToken("auth/renew");
    const body = await response.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authChekingFinish });

export const login = (user) => ({ type: types.authLogin, payload: user });

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
    dispatch(clearEvents());
  };
};

export const logout = () => ({ type: types.authLogout });
const clearEvents = () => ({ type: types.eventsReset });

import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { prepareEvents } from "../helpers/prepareEvents";
export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const response = await fetchWithToken("events", event, "POST");
      const body = await response.json();
      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name,
        };
        console.log(event);
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log("[CREATE-EVENT]", error);
      Swal.fire("Error", "Ooops something went wrong", "error");
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});
export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.clearActiveEvent,
});

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const startEventDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;

    try {
      const resp = await fetchWithToken(`events/${id}`, {}, "DELETE");
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log("[EDIT EVENT]", error);
      Swal.fire("Error", "Ooops something went wrong", "error");
    }
  };
};

const eventDeleted = () => ({ type: types.eventDeleted });

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const response = await fetchWithToken("events");
      const body = await response.json();

      if (body.ok) {
        const events = prepareEvents(body.events);
        dispatch(eventLoaded(events));
      }
    } catch (error) {
      console.log("[CREATE-EVENT]", error);
      Swal.fire("Error", "Ooops something went wrong", "error");
    }
  };
};

const eventLoaded = (events) => ({ type: types.eventLoaded, payload: events });

export const starEventUpdated = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`events/${event.id}`, event, "PUT");
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log("[EDIT EVENT]", error);
      Swal.fire("Error", "Ooops something went wrong", "error");
    }
  };
};

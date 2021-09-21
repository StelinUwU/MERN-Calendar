const baseURL = process.env.REACT_APP_API_URL;

export const fetchWithoutToken = (endPoint, data, method = "GET") => {
  const url = `${baseURL}/${endPoint} `;
  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchWithToken = (endPoint, data, method = "GET") => {
  const url = `${baseURL}/${endPoint} `;
  const token = localStorage.getItem("token") || "";
  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};

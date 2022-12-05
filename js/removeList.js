import { API_URL, HEADER } from './store.js';

export async function removeList(id) {
    const removeURL = API_URL + `/${id}`;

    const res = await fetch(removeURL, {
      method: "DELETE",
      headers: HEADER,
    });
    const json = await res.json();
    return json;
  }
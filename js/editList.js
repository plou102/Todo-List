import { API_URL, HEADER } from './store.js';

export async function editList(id, title, done, order) {
  const removeURL = API_URL + `/${id}`;

  const res = await fetch(removeURL, {
    method: "PUT",
    headers: HEADER,
    body: JSON.stringify({
      title,
      done,
      order,
    }),
  });
  const json = await res.json();
  return json;
}
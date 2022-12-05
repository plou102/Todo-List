import { API_URL, HEADER } from './store.js';

export async function addList( title, order ) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({
      title,
      order,
    }),
  });
  const json = await res.json();

  return json;
}
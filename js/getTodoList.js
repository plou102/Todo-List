import { API_URL, HEADER } from './store.js';

export async function getTodoList() {
  const res = await fetch(API_URL, {
    method: "GET",
    headers: HEADER,
  });
  const json = await res.json();
  return json;
}
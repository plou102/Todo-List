export const API_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos';
export const HEADER = {
  'content-type': 'application/json',
  'apikey': 'FcKdtJs202209',
  'username': 'KDT3_ParkJeongMin',
};

export const addBtn = document.querySelector('.add--btn');
export const inputEl = document.querySelector('.list--input');
export const listContentEl = document.querySelector('.list--content');
export const removeAllBtn = document.querySelector('.removeall--btn');
export const doneRemoveBtn = document.querySelector('.done__remove--btn');
export const lodingDisplay = document.querySelector('.loding--display');
export const doneOnlyBtn = document.querySelector('.done__only');
export const undoneOnlyBtn = document.querySelector('.undone__only');
export const allViewBtn = document.querySelector('.all__view');

export const removeClickEvent = document.querySelector('.trash--img');
export const viewClickEvent = document.querySelector('.view--img');
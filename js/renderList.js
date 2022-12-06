import { listContentEl, lodingDisplay } from "./store.js";
import { removeList } from './removeList.js';
import { editList } from "./editList.js";
import { getTodoList } from './getTodoList.js';



export function renderList(todos) {
  for (let i = 0; i < todos.length; i++) {
    const { id, order, title, done, createdAt, updatedAt } = todos[i];
    let createDate = new Date(createdAt);
    let [cMonth, cDay, cHours, cMinutes] = [
      String(createDate.getMonth() + 1).padStart(2, 0),
      String(createDate.getDate()).padStart(2, 0),
      String(createDate.getHours()).padStart(2, 0),
      String(createDate.getMinutes()).padStart(2, 0),
    ]

    let updateDate = new Date(updatedAt);
    let [uMonth, uDay, uHours, uMinutes] = [
      String(updateDate.getMonth() + 1).padStart(2, 0),
      String(updateDate.getDate()).padStart(2, 0),
      String(updateDate.getHours()).padStart(2, 0),
      String(updateDate.getMinutes()).padStart(2, 0),
    ]
      .map(String)
      .map((el) => el.padStart(2, "0"));

    const listTitle = document.createElement('div');
    listTitle.classList.add('listbox');
    listTitle.id = `${id}`;
    listTitle.innerHTML = /*html*/ `
      <input type='checkbox' class='list--${id}' id='id--${id}'/>
      <input type='text' class='title--${id} title--style' value='${title}' />
      <div class='date__content'>
        <span>생성일: ${cMonth}월 ${cDay}일 ${cHours} : ${cMinutes} ﹒ </span>
        <span>수정일: ${uMonth}월 ${uDay}일 ${uHours} : ${uMinutes}</span>
      </div>
      <button class='remove--${id}'>삭제</button>
    `
    listContentEl.append(listTitle);

    const doneCheck = document.getElementById(`id--${id}`);

    if (todos[i].done === true) {
      doneCheck.setAttribute('checked', true);
      listTitle.classList.add('done');
    } else {
      doneCheck.removeAttribute('checked');
      listTitle.classList.remove('done');
    }

    doneCheck.addEventListener('click', () => {
      if (doneCheck.checked) {
        listTitle.classList.add('done');
        todos[i].done = true;
        editList(`${id}`, `${title}`, true);
      } else {
        listTitle.classList.remove('done');
        todos[i].done = false;
        editList(`${id}`, `${title}`, false);
      }
      console.log(todos[i]);
    });

    console.log(todos[i]);

    const removeBtn = document.querySelector(`.remove--${id}`);
    removeBtn.addEventListener('click', () => {
      lodingDisplay.style.display = 'inline-block';
      setTimeout(() => {
        removeList(removeBtn.parentElement.getAttribute('id'));
        lodingDisplay.style.display = 'none';
        removeBtn.parentElement.remove();
      }, 500);

    });


    const editTitle = document.querySelector(`.title--${id}`);
    editTitle.addEventListener('change', async () => {
      const newTitle = editTitle.value;
      editList(`${id}`, newTitle, `${done}`);

      lodingDisplay.style.display = 'inline-block';
      setTimeout(async () => {
        let todos = await getTodoList();
        listContentEl.innerHTML = '';
        lodingDisplay.style.display = 'none';
        renderList(todos);
      }, 1000);
    });


  }
}

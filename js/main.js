import {
  addBtn,
  inputEl,
  removeAllBtn,
  listContentEl,
  doneRemoveBtn,
  lodingDisplay,
  doneOnlyBtn,
  undoneOnlyBtn,
  allViewBtn,
  removeClickEvent,
  viewClickEvent
} from './store.js'
import { addList } from './addList.js';
import { getTodoList } from './getTodoList.js';
import { renderList } from './renderList.js';
import { removeList } from './removeList.js';

async function todoStart() {
  let todos = await getTodoList();
  renderList(todos);
}

lodingDisplay.style.display = 'inline-block';
lodingDisplay.style.top = '100%';
setTimeout(() => {
  lodingDisplay.style.display = 'none';
  lodingDisplay.style.top = '50%';
  todoStart();
}, 1000);

addBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  let inputTitle = inputEl.value;
  await addList( inputTitle );

  lodingDisplay.style.display = 'inline-block';
  setTimeout(async () => {
    let todos = await getTodoList();
  listContentEl.innerHTML = '';
  inputEl.value = '';

  lodingDisplay.style.display = 'none';
  renderList(todos);
  }, 500);
  
});

inputEl.addEventListener('keydown', (event) => {
  if(event.keyCode === 13) {
    addBtn.click();
  }
})

removeAllBtn.addEventListener('click', async () => {
  let todos = await getTodoList();
  lodingDisplay.style.display = 'inline-block';
  setTimeout(() => {
    for (let i = 0; i < todos.length; i++) {
      const {
        id
      } = todos[i];
      removeList(id);
    }
    lodingDisplay.style.display = 'none';
    listContentEl.innerHTML = '';
  }, 1000);
  removeClickEvent.classList.remove('remove');
});

doneRemoveBtn.addEventListener('click', async () => {
  let todo = listContentEl.children;

  lodingDisplay.style.display = 'inline-block';
  setTimeout(() => {
    for(let i = 0; i < todo.length; i++) {
      const id = todo[i].id;
      const todoDone = document.getElementById(`${id}`);
      if (todoDone.getAttribute('class') === 'listbox done') {
        removeList(id);
        todoDone.remove();
        i = -1;
      }
    }
    lodingDisplay.style.display = 'none';
  }, 1000);
  removeClickEvent.classList.remove('remove');
});

doneOnlyBtn.addEventListener('click', async () => {
  let todo = listContentEl.children;

  lodingDisplay.style.display = 'inline-block';
  setTimeout(() => {
    for(let i = 0; i < todo.length; i++) {
      const id = todo[i].id;
      const todoDone = document.getElementById(`${id}`);
      if(todoDone.getAttribute('class') === 'listbox') {
        todoDone.style.display = 'none';
      } else todoDone.style.display = 'block';
    }
    lodingDisplay.style.display = 'none';
  }, 500);
  viewClickEvent.classList.remove('view');
});

undoneOnlyBtn.addEventListener('click', async () => {
  let todo = listContentEl.children;

  lodingDisplay.style.display = 'inline-block';
  setTimeout(() => {
    for(let i = 0; i < todo.length; i++) {
      const id = todo[i].id;
      const todoDone = document.getElementById(`${id}`);
      if(todoDone.getAttribute('class') === 'listbox done') {
        todoDone.style.display = 'none';
      } else todoDone.style.display = 'block';
    }
    lodingDisplay.style.display = 'none';
  }, 500);
  viewClickEvent.classList.remove('view');
})

allViewBtn.addEventListener('click', async () => {
  let todos = await getTodoList();

  lodingDisplay.style.display = 'inline-block';
  setTimeout(() => {
    listContentEl.innerHTML = '';
    lodingDisplay.style.display = 'none';
    renderList(todos);
  }, 500);
  viewClickEvent.classList.remove('view');
});


// img click event
let remove = false;
removeClickEvent.addEventListener('click', () => {
  remove = !remove;
  if(remove) {
    removeClickEvent.classList.add('remove');
    viewClickEvent.classList.remove('view');
  } else removeClickEvent.classList.remove('remove');
});

let view = false;
viewClickEvent.addEventListener('click', () => {
  view = !view;
  if(view) {
    viewClickEvent.classList.add('view');
    removeClickEvent.classList.remove('remove');
  } else viewClickEvent.classList.remove('view');
});
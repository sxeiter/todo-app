import * as elements from './createElements.js';
import {getStorage, user} from './storage.js';
import {
  createNewTaskRow,
  createStorageRow,
} from './createElements.js';
const renderTasks = (arrayObj) => {
  arrayObj.map((item) => createStorageRow(item, arrayObj.indexOf(item)));
};
export const renderNewTask = (arrayObj) => {
  arrayObj.map((item) => (
    item.id === user.lastNewTask ?
      createNewTaskRow(item, arrayObj.indexOf(item)) : {}),
  );
};

export const disableSubmitBtn = () => {
  if (elements.formControl.value !== '') {
    elements.submitBtn.removeAttribute('disabled');
  } else {
    elements.submitBtn.setAttribute('disabled', 'disabled');
  }
};



const updateRowOrder = () => {
  const allTr = document.querySelectorAll('tr');
  [...allTr].forEach((item, index) =>
    item.firstElementChild.textContent = `${index++}`);
};

export const removeRow = (rowToDelete) => {
  const idToDel = rowToDelete.dataset.id;
  rowToDelete.remove();
  updateRowOrder();
  return idToDel;
};
export const renderFinishRow = (finishRow) => {
  finishRow.className = 'table-success';
  finishRow.children[1].classList.replace(
      'task', 'text-decoration-line-through');
  finishRow.children[2].innerText = 'Выполнено';
  finishRow.children[3].children[1].innerText = 'Возобновить';
};

export const renderUnFinishRow = (unFinishRow, status) => {
  unFinishRow.className = `${status}`;
  unFinishRow.children[1].classList.replace(
      'text-decoration-line-through', 'task');
  unFinishRow.children[2].innerText = 'В процессе';
  unFinishRow.children[3].children[1].innerText = 'Завершить';
};

export const renderDom = () => {
  elements.appContainer.append(elements.h3, elements.form,
      elements.tableWrapper);
  elements.formGroup.append(elements.formControl);
  elements.form.append(elements.formGroup, elements.formGroup2,
      elements.submitBtn, elements.resetBtn);
  elements.tableWrapper.append(elements.table);
  renderTasks(getStorage(user.name));
};
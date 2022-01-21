'use strict'

const container = document.querySelector('.container');
const nameContainer = document.querySelector('.main__ul');
const tbody = document.querySelector('tbody');
const theadRow = document.querySelector('.main__table > thead > tr');
const columnSelect = document.querySelector('.main__row select');
const fields = [];
const selectedFields = [0, 1];
let users = [];


getUsers()

columnSelect.addEventListener('change', () => {
  const fields = Array.from(columnSelect.selectedOptions).map(option => option.value)
  showUserInfo(users, fields)
})
// function showUserNames(users) {
//   nameContainer.innerHTML = '';
//   for (const user of users) {
//     nameContainer.innerHTML += `<li class="main__li">${user}</li>`
//   }
// }

function showUserNames(names) {
  nameContainer.innerHTML = names.map(name => `<li class="main__li">${name}</li>`).join('');
}

function getUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(parseJSON).then(takeUserNames).then(showUserNames)
}

function getUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(parseJSON).then(usersData => {
      users = usersData.map(userData => flatten(userData));
      fillSelect(getFields(usersData[0]), selectedFields)
      showUserInfo(usersData, selectedFields.map(i => fields[i]));
      showUserNames(takeUserNames(usersData));
      container.hidden = false;
    })
}

function parseJSON(response) {
  return response.json();
}

function extractName(obj) {
  return obj.name;
}

function mapWith(cb) {
  return function (arr) {
    return arr.map(cb);
  }
}

// takeUserNames = mapWith(extractName);

function takeUserNames(users) {
  return mapWith(extractName)(users)
}

function showUserInfo(users, fields) {
  theadRow.innerHTML = fields.reduce((html, field) => html + `<th>${field}</th>`, '')

  tbody.innerHTML = users.reduce((html, user) => html + `<tr>${fields.reduce(
    (html, field) => html + `<td>${user[field]}</td>`, ''
  )}</tr>`, '')


}

function fillSelect(labels, selectedFields) {
  columnSelect.innerHTML = labels.map((label, i) => `<option ${selectedFields.includes(i) ? 'selected' : ''}>${label}</option>`).join('');
}

function getFields(obj) {
  for (const key in obj) {
    if (typeof obj[key] != 'object') {
      fields.push(key);
    } else {
      for (const key2 in obj[key]) {
        if (typeof obj[key][key2] != 'object') {
          fields.push(key + '.' + key2);
        } else {
          for (const key3 in obj[key][key2]) {
            fields.push(key + '.' + key2 + '.' + key3);
          }
        }
      }
    }
  }
  return fields;
}

function flatten(obj, keys=[]){
  const flatObj = {};
  for (const key in obj){
    if (typeof obj[key] != 'object'){
      flatObj[keys.concat(key).join('.')] = obj[key];
    } else {
      Object.assign(flatObj, flatten(obj[key], keys.concat(key)));
    }
  }
  return flatObj;
}


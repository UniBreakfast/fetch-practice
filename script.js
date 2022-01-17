'use strict'

const container = document.querySelector('.container');
const nameContainer = document.querySelector('.main__ul');
const tbody = document.querySelector('tbody');
const columnSelect = document.querySelector('.main__row select');
const users = [];
const fields = [];

showUserNames(users)
getUsers()
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
    .then(parseJSON).then(users => {
      fillSelect(getFields(users[0]))
      showUserInfo(users);
      showUserNames(takeUserNames(users));
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

function showUserInfo(users) {
  tbody.innerHTML = users.map(user => {
    return `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
      </tr>
    `
  }).join('');
}

function fillSelect(labels) {
  columnSelect.innerHTML = labels.map(label => `<option>${label}</option>`).join('');
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

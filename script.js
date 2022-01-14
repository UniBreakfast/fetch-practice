'use strict'

const nameContainer = document.querySelector('.main__ul');
const users = ['Иван Ургант', 'Семен Слепаков'];

showUserNames(users)
getUsers()

// function showUserNames(users) {
//   nameContainer.innerHTML = '';
//   for (const user of users) {
//     nameContainer.innerHTML += `<li class="main__li">${user}</li>`
//   }
// }

function showUserNames(names) {
  nameContainer.innerHTML = names.map(name => `<li class="main__li">${name}</li>` ).join('');
}

function getUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(parseJSON).then(takeUserNames).then(showUserNames)
}

function parseJSON(response){
  return response.json();
}

function extractName(obj){
  return obj.name;
}

function mapWith(cb){
  return function(arr){
    return arr.map(cb);
  }
}

// takeUserNames = mapWith(extractName);

function takeUserNames(users){
  return mapWith(extractName)(users)
}
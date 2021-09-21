"use strict";

const main = document.getElementById('main');
const btnAddUser = document.getElementById('add-user');
const btnDouble = document.getElementById('double');
const btnFilter = document.getElementById('filter-rich');
const btnTotal = document.getElementById('total');
const btnSort = document.getElementById('sort');

let data = [];

const getRandomUser = async function () {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    balance: Math.floor(Math.random() * 100000),
  };

  addData(newUser);
};

const addData = function (obj) {
  data.push(obj);
  updateDOM();
};

const updateDOM = function (providedData = data) {
  main.innerHTML = '<h2><strong>Name</strong> Balance</h2>';
  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('users');
    element.innerHTML = `<strong>${item.name}</strong>₹${formatToCurrency(
      item.balance
    )}`;
    main.appendChild(element);
  });
};

const doubleBalance = function () {
  data = data.map((user) => {
    return { ...user, balance: user.balance * 2 };
  });

  updateDOM();
};

function formatToCurrency(amount) {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const filterRich = function () {
  data = data.filter((user) => user.balance > 100000);
  updateDOM();
};

const getSorted = function(){
  data = data.sort((a,b) => {
    return b.balance - a.balance;
  });

  updateDOM();

};

const totalBalance = function () {
  const add = data.reduce((acc, user) => (acc = acc + user.balance), 0);

  const addEl = document.createElement('div');
  addEl.innerHTML = `<h3>Total Balance: <strong>${formatToCurrency(
    add
  )}</strong></h3>`;
  main.appendChild(addEl);
};

getRandomUser();
getRandomUser();
getRandomUser();

btnAddUser.addEventListener('click', getRandomUser);

btnDouble.addEventListener('click', doubleBalance);

btnFilter.addEventListener('click', filterRich);

btnTotal.addEventListener('click', totalBalance);

btnSort.addEventListener('click', getSorted);




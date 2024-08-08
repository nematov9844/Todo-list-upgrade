let addUserBtn = document.getElementById("addUser");
let modal = document.getElementById("modal");
let markClose = document.getElementById("Close");
let close = document.getElementById("close");
let save = document.getElementById("save");
let result = document.getElementById("result");
let search_input = document.getElementById("search");
let form_all = document.getElementById("form_all");
let first_name = document.getElementById("first_name");
let last_name = document.getElementById("last_name");
let age = document.getElementById("age");
let mail = document.getElementById("mail");
let phone_number = document.getElementById("phone_number");

let users = {};
let arr = JSON.parse(localStorage.getItem("key")) || [];

modal.style.display = "none";
addUserBtn.addEventListener("click", () => {
  first_name.value = "";
  last_name.value = "";
  age.value = "";
  phone_number.value = "";
  mail.value = "";
  statusDisplay("block");
});
markClose.addEventListener("click", () => {
  statusDisplay("none");
});
close.addEventListener("click", () => {
  statusDisplay("none");
});
save.addEventListener("click", () => {
  statusDisplay("none");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    statusDisplay("none");
  }
});

function statusDisplay(style) {
  modal.style.display = style;
}

form_all.addEventListener("submit", (e) => {
  e.preventDefault();
  arr.push({
    first_name: first_name.value,
    last_name: last_name.value,
    age: age.value,
    phone_number: phone_number.value,
    mail: mail.value,
  });
  output();
});
tolocal();
output();

function output(all = arr) {
  result.innerHTML = "";
  all.forEach((item, index) => {
    result.innerHTML += `
        <tr class="text-white"> 
        <th>${item.first_name}</th>
        <th>${item.last_name}</th>
        <th>${item.age}</th>
        <th>${item.phone_number}</th>
        <th>${item.mail}</th>
        <th><button class="bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:to-green-800 text-white font-bold py-0 px-1 rounded" onclick="editItem(${index})">Edit</button></th>  
        <th><button class="bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-700 hover:to-red-800 text-white font-bold py-0 px-1 rounded" onclick="deleteItem(${index})">delete</button></th>
        </tr>`;
  });
  tolocal();
}

function editItem(index) {
  first_name.value = arr[index].first_name;
  last_name.value = arr[index].last_name;
  age.value = arr[index].age;
  mail.value = arr[index].mail;
  phone_number.value = arr[index].phone_number;
  modal.style.display = "block";
  console.log(arr[index]);
  output();
  arr.splice(index, 1);
  tolocal();
}

function tolocal() {
  localStorage.setItem("key", JSON.stringify(arr));
}

search_input.addEventListener("input", () => {
  const loverCaseInput = search_input.value.toLowerCase();

  let newArr = arr.filter(
    (item) =>
      item.first_name.toLowerCase().includes(loverCaseInput) ||
      item.last_name.toLowerCase().includes(loverCaseInput) ||
      item.age.toLowerCase().includes(loverCaseInput) ||
      item.mail.toLowerCase().includes(loverCaseInput)
  );
  output(newArr);
});

function deleteItem(index) {
  arr.splice(index, 1);
  output();
  tolocal();
}
function removeAll() {
  arr = [];
  output();
  tolocal();
}

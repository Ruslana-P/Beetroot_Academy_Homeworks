const input = document.querySelector("#newtext");
const list = document.querySelector("#lists");
const select = document.querySelector("#remselect");

document.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "addBtn":
      const value = input.value.trim();
      addListItem(value, list) && addSelectItem(value, select);
      break;
    case "rembtn":
      removeItems();
      break;
  }
});

function addListItem(value, el) {
  if (value == "") {
    showNotify("Value can not be empty", "red");
    return;
  }
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.textContent = value;

  console.log(value);
  // debugger;
  li.setAttribute("value", `${value}`);
  console.log(li);
  el.appendChild(li);
  return true;
}

function addSelectItem(value, el) {
  const newOptions = document.createElement("option");
  newOptions.value = value;
  newOptions.textContent = value;
  el.size = el.size + 1;
  el.appendChild(newOptions);
  input.value = "";
}

function showNotify(msg, bgcolor) {
  const notify = document.createElement("div");
  notify.classList.add("notify");
  notify.textContent = msg;
  notify.style.background = bgcolor;

  document.querySelector("body").appendChild(notify);
  const notifyNode = document.querySelector(".notify");
  setTimeout(() => (notifyNode.style.right = 0), 500);
  setTimeout(() => {
    notifyNode.style.right = "-150px";
  }, 2000);
  setTimeout(() => notifyNode.remove(), 3000);
}

function removeItems() {
  options = select.options;
  arrayOptions = [...options];
  let len = arrayOptions.length;
  if (len === 0) {
    showNotify("There is nothing to delete", "red");
    return;
  }

  for (let i = len - 1; i >= 0; i--) {
    if (arrayOptions[i].selected) {
      //remove from select
      let node = options.item(i);
      select.removeChild(node);
      select.size -= 1;

      //   remove from ul
      let items = list.querySelectorAll("li");
      items.forEach((item) => {
        if (item.getAttribute("value") == arrayOptions[i].value) {
          list.removeChild(item);
        }
      });
    }
  }
}

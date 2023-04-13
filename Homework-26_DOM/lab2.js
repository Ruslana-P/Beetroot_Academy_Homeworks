const items = document.querySelector("#items");
const removeBackup = document.querySelector("#remove-backup");

// object for work with localStorage
const locStor = {
  set(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
  },
  get(key) {
    const ob = localStorage.getItem(key);
    return ob ? JSON.parse(ob) : null;
  },
  has(key) {
    return localStorage.getItem(key) ? true : false;
  },
  delete(key) {
    localStorage.removeItem(key);
  },
};

// object for work with our list (items)
const ob = {
  backupArr: [],
  clickHandler: function ({ target }) {
    switch (target.id) {
      case "backup":
        this.backup();
        break;
      case "restore":
        this.restore();
        break;
    }
  },
  backup: function () {
    this.backupArr = [...items.querySelectorAll("a")].map((item) => {
      return {
        link: item.href,
        name: item.text,
      };
    });
    locStor.set("backup", this.backupArr);
    showNotify("Backup has been created", "green");
  },
  restore: function () {
    const restoreBackup = locStor.get("backup");
    if (restoreBackup === null) {
      showNotify("Local storage is epmty", "red");
      return;
    }

    let r = restoreBackup.map((item) => {
      return ` <li class="item list-group-item">
        <a href=${item.link} target="_blank">${item.name}</a>
      </li>`;
    });
    items.innerHTML = r.join("");
    showNotify("Items have been restored", "green");

    if (removeBackup.checked) {
      locStor.delete("backup");
      setTimeout(() => showNotify("backup has been deleted", "red"), 3000);
    }
  },
  submitHandler: function (e) {
    e.preventDefault();
    if (e.target.name != "myform") {
      return;
    }
    if (!locStor.has("backup")) {
      showNotify("Please do backup first", "yellow");
      return;
    }
    const input = e.target.querySelector('input[name="newtext"]');
    const newText = input.value;
    if (newText.trim() === "") {
      showNotify("Input is empty", "red");
      return;
    }

    let isChanged = false;
    [...items.querySelectorAll("a")].some((item) => {
      if (item.dataset.changed != "1") {
        item.dataset.changed = "1";
        item.textContent = newText;
        isChanged = true;
        input.value = "";
        return true;
      }
    });
    if (!isChanged) {
      showNotify("All elements have been change already", "red");
    }
  },
};

//function for showing notify
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

document.addEventListener("click", ob.clickHandler.bind(ob));
document.addEventListener("submit", ob.submitHandler.bind(ob));

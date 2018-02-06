class Todo {

    constructor() {
        this.data = localStorage.getItem("data") && JSON.parse(localStorage.getItem("data")) || [];
        this.app = document.querySelector("#app");
        this.table = document.createElement("table");
        this.textBox = document.createElement("input");
        this.addButton = document.createElement("button");
        this.initialize();
    }

    initialize() {

        this.textBox.type = "text";
        this.textBox.placeholder = "Type something... ";
        this.addButton.innerText = "➕";

        this.textBox.addEventListener("keypress", (event) => {
            if (event.keyCode === 13) {
                this.add.call(this);
            }
        });

        this.addButton.addEventListener("click", this.add.bind(this));

        this.app.appendChild(this.textBox);
        this.app.appendChild(this.addButton);
        this.app.appendChild(this.table);
        this.initializeList(this.data);
    }

    addItem(item) {

        const template = document.createElement("tr");
        const textColumn = document.createElement("td");
        const removeButtonColumn = document.createElement("td");
        const removeButton = document.createElement("button");
        const checkButtonColumn = document.createElement("td");
        const checkButton = document.createElement("button");

        textColumn.innerText = item.text;
        removeButton.innerText = "➖";

        removeButton.addEventListener("click", () => {
            this.data = this.data.filter(element => element.id != item.id);
            this.updateData();
            template.remove();
        })


        function style(ok) {
            if (ok === "true") {
                template.style.textDecoration = "none";
                checkButton.dataset.ok = false;
                checkButton.innerText = "✅";
            } else {
                template.style.textDecoration = "line-through";
                checkButton.innerText = "✖";
                checkButton.dataset.ok = true;
            }
        }

        const isComplete = (!(item.ok === "true")).toString();
        style(isComplete);

        checkButton.addEventListener("click", () => {
            style(checkButton.dataset.ok);
            const selectedItem = this.data.find(element => element.id === item.id);
            if (selectedItem) {
                selectedItem.ok = checkButton.dataset.ok;
                this.updateData();
            }
        });

        template.appendChild(textColumn);
        removeButtonColumn.appendChild(removeButton);
        checkButtonColumn.appendChild(checkButton);
        template.appendChild(removeButtonColumn);
        template.appendChild(checkButtonColumn);
        this.table.prepend(template);
    }

    initializeList() {
        for (const item of this.data) {
            this.addItem(item);
        }
    }

    add() {
        if (this.textBox.value.length < 1) return false;
        const item = {
            "text": this.textBox.value,
            "ok": "false",
            "id": this.data.length
        }
        this.addItem(item);
        this.data.push(item);
        this.updateData();
        this.textBox.value = "";
    }

    updateData() {
        localStorage.setItem("data", JSON.stringify(this.data));
    }
}

const todo = new Todo();
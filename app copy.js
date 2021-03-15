let add = document.querySelectorAll("form button");


let section = document.querySelector("section");
console.log(add);
console.log(add.length);
for (i = 0; i < add.length; i++) {
    add[i].addEventListener("click", e => {
        e.preventDefault();

        let form = e.target.parentElement;
        let todo_Text = form.children[0].value;
        let todo_Year = form.children[1].value;
        let todo_Month = form.children[2].value;
        let todo_Date = form.children[3].value;

        console.log(todo_Text);

        let todo = document.createElement("div");
        todo.classList.add("todo");

        let text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerText = todo_Text;

        let time = document.createElement("p");
        time.classList.add("todo-time");
        time.innerText = todo_Year + "/" + todo_Month + "/" + todo_Date;

        let completebutton = document.createElement("button");
        completebutton.classList.add("complete");
        completebutton.innerHTML = '<i class="fas fa-calendar-check"></i>';


        let trashbutton = document.createElement("button");
        trashbutton.classList.add("trash");
        trashbutton.innerHTML = '<i class="far fa-trash-alt"></i>';




        todo.appendChild(text);
        todo.appendChild(time);
        todo.appendChild(completebutton);
        todo.appendChild(trashbutton);

        section.appendChild(todo);

        todo.style.animation = "scaleUp 0.3s forwards";

    });



}

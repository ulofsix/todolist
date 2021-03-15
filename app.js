
/* 抓取新增鍵位置 */
let add = document.querySelector("form button");
// localStorage.removeItem("list");
let section = document.querySelector("section");
console.log(add);

/* 讀取舊資料 */
load_data();

/* 新增監聽事件 */
add.addEventListener("click", e => {
    e.preventDefault();
    /* 抓取上一層父元素 */
    let form = e.target.parentElement;
    let todo_Text = form.children[0].value;
    let todo_Year = form.children[1].value;
    let todo_Month = form.children[2].value;
    let todo_Date = form.children[3].value;

    if (todo_Text === "") {
        alert("請輸入事項");
        return 0;
    }
    /* 當筆 localStorage 暫存 */
    let my_todo = {
        todo_Text: todo_Text,
        todo_Year: todo_Year,
        todo_Month: todo_Month,
        todo_Date: todo_Date
    };
    /* 新增紀錄至 localStorage 裡的['list']*/
    let my_list = localStorage.getItem("list");
    /* 如果為空，直接新增 */
    if (my_list == null) {
        localStorage.setItem("list", JSON.stringify([my_todo]));
    } else {
        let my_list_array = JSON.parse(my_list);
        my_list_array.push(my_todo);
        localStorage.setItem("list", JSON.stringify(my_list_array));
    }
    /* 顯示整筆紀錄 */
    console.log(JSON.parse(localStorage.getItem("list")));

    /* 開始新增div.todo */
    create_todo_list(
        todo_Text,
        todo_Year,
        todo_Month,
        todo_Date);
});



/* 排序按鈕功能 */
let sort_button = document.querySelector("div.sort button");
console.log(sort_button);
sort_button.addEventListener("click", () => {
    let sorted_array = merg_sort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sorted_array));

    let len = section.children.length;
    for (let i = 0; i < len; i++) {
        section.children[0].remove();
    }

    load_data();
});

/*顯示排序*/
console.log("---sort---");
// console.log(merg_sort(JSON.parse(localStorage.getItem("list"))));

function create_todo_list(
    todo_Text,
    todo_Year,
    todo_Month,
    todo_Date) {
    /* 開始新增div.todo */
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

    /* 追加子元素 */
    todo.appendChild(text);
    todo.appendChild(time);
    todo.appendChild(completebutton);
    todo.appendChild(trashbutton);

    section.appendChild(todo);

    todo.style.animation = "scaleUp 0.3s forwards";

    /* 新增監聽事件，當completebutton被點擊後 */
    completebutton.addEventListener("click", e => {
        let todo_item = e.target.parentElement;
        // todo_item.classList.add("done");
        /* 語法:toggle 如果沒有 .done 就新增 ，有就移除該 class */
        todo_item.classList.toggle("done");

    });

    /* 新增監聽事件，當trashbutton被點擊後 */
    trashbutton.addEventListener("click", e => {
        let todo_item = e.target.parentElement;
        /* 新增監聽事件，動畫結束後 */
        todo_item.addEventListener("animationend", () => {
            todo_item.remove();
        });

        todo_item.style.animation = "scaleDown 0.3s forwards";
        // todo_item.style.animation = "scaleDown 0.3s forwards";
        // todo_item.remove();

        /* 刪除localStorage 資料 */
        let text = todo_item.children[0].innerText;
        let my_list_array = JSON.parse(localStorage.getItem("list"));
        my_list_array.forEach((item, index) => {
            if (item.todo_Text == text) {
                my_list_array.splice(index, 1);
                localStorage.setItem("list", JSON.stringify(my_list_array));

            }


        });

    });
}

function merg_time(arr1 = [], arr2 = []) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
        /* 比年 */
        if (Number(arr1[i].todo_Year) > Number(arr2[j].todo_Year)) {
            result.push(arr2[j]);
            j++
        } else if (Number(arr1[i].todo_Year) < Number(arr2[j].todo_Year)) {
            result.push(arr1[i]);
            i++;
        } else if (Number(arr1[i].todo_Year) == Number(arr2[j].todo_Year)) {
            /* 比月 */
            if (Number(arr1[i].todo_Month) > Number(arr2[j].todo_Month)) {
                result.push(arr2[j]);
                j++;
            } else if (Number(arr1[i].todo_Month) < Number(arr2[j].todo_Month)) {
                result.push(arr1[i]);
                i++;
            } else if (Number(arr1[i].todo_Month) == Number(arr2[j].todo_Month)) {
                /* 比日 */
                if (Number(arr1[i].todo_Date) > Number(arr2[j].todo_Date)) {
                    result.push(arr2[j]);
                    j++;
                } else {
                    result.push(arr1[i]);
                    i++;
                }
            }
        }
    }

    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }
    return result;
}

function merg_sort(arr = []) {
    if (arr.length === 1) {
        return arr;
    } else {
        let middle = Math.floor(arr.length / 2);
        let right = arr.slice(0, middle);
        let left = arr.slice(middle, arr.length);
        return merg_time(merg_sort(right), merg_sort(left));

    }
}

/* 讀取紀錄 */
function load_data() {
    let my_list = localStorage.getItem("list");
    console.log("2" + my_list);
    if (my_list !== null) {
        let my_list_array = JSON.parse(my_list);
        my_list_array.forEach(item => {
            /* 開始新增div.todo */
            create_todo_list(
                item.todo_Text,
                item.todo_Year,
                item.todo_Month,
                item.todo_Date)
        });
    }




}






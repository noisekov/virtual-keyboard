const body = document.querySelector("body");
const div = document.createElement("div");
div.classList.add("content");
body.append(div);
const content = document.querySelector(".content");

const title = document.createElement("p");
title.classList.add("title");
title.textContent = "Virtual keyboard";
content.append(title);

const textAreaCreate = document.createElement("textarea");
textAreaCreate.classList.add("textarea");
content.append(textAreaCreate);
const textArea = document.querySelector(".textarea");

const keyboardWrapper = document.createElement("div");
keyboardWrapper.classList.add("keyboard");
content.append(keyboardWrapper);

const description = document.createElement("p");
description.classList.add("description");
description.innerHTML = "The keyboard has been created in Windows";
content.append(description);

const lang = document.createElement("p");
lang.classList.add("lang");
lang.innerHTML = "Change language left combination Ctrl + Alt";
content.append(lang);

//получаем значения кнопок из JSON
function dataJSON() {
    const xhr = new XMLHttpRequest();
    const URL = "./data.json";
    xhr.open("GET", URL , false);
    xhr.send();
    return xhr.response;
}

const data = JSON.parse(dataJSON());

const keyboard = document.querySelector(".keyboard");

//генерим кнопки с классом code
data.class.code.forEach(btn => {
    const btnKeyboard = document.createElement("button");
    btnKeyboard.className = `${btn} button`;
    keyboard.append(btnKeyboard);
});

const button = document.querySelectorAll(".button");

let language = "ru";
let textCase = "lower";

//первоначальный язык на кнопках
data.ru.lowerCase.forEach((btn, index) => {
    button[index].textContent = `${btn}`;
});

//изменение языка
function changeLanuage(lang) {
    if (lang === "ru") {
        language = "en";
        data.en.lowerCase.forEach((btn, index) => {
            button[index].textContent = `${btn}`;
        });
    } else {
        language = "ru";
        data.ru.lowerCase.forEach((btn, index) => {
            button[index].textContent = `${btn}`;
        });
    }
}

//изменение регистра
function changeCase(lang, caseVal) {
    if (lang === "ru" && caseVal === "lower") {
        data.ru.upperCase.forEach((btn, index) => {
            button[index].textContent = `${btn}`;
        });
    } else if (lang === "ru" && caseVal === "upper") {
        data.ru.lowerCase.forEach((btn, index) => {
            button[index].textContent = `${btn}`;
        });
    } else if (lang === "en" && caseVal === "lower") {
        data.en.upperCase.forEach((btn, index) => {
            button[index].textContent = `${btn}`;
        });
    } else {
        data.en.lowerCase.forEach((btn, index) => {
            button[index].textContent = `${btn}`;
        });
    }
}

document.addEventListener("keydown", findKeyPress);
document.addEventListener("keyup", removeKeyPress);

function findKeyPress(evt) {
    textArea.focus();
    evt.preventDefault()

    button.forEach (btn => {
        if (btn.classList[0] === evt.code) {
            btn.classList.add("active");
            if (btn.innerHTML.split('').length < 2) {
                textArea.value += btn.innerHTML;
            }
        }
    })

    if (evt.code === "CapsLock") {
        if (button[20].innerHTML === button[20].innerHTML.toLowerCase()) {
            textCase = "lower";
            changeCase(language, textCase);
        } else {
            textCase = "upper";
            changeCase(language, textCase);
        }
    }

    if (evt.code === "ControlLeft" && evt.altKey || evt.code === "AltLeft" && evt.ctrlKey) {
        changeLanuage(language);
    }
}

function removeKeyPress(evt) {
    button.forEach (btn => {
        if (btn.classList[0] === evt.code && btn.classList[0] !== "CapsLock") {
            btn.classList.remove("active");
        }

        if (btn.classList[0] === "CapsLock" && textCase === "upper") {
            btn.classList.remove("active");
        }
    })
}

button.forEach(btn => {
    btn.addEventListener("mousedown", setActiveClass);
    btn.addEventListener("mouseup", removeActiveClass);
})

function setActiveClass(evt) {
    evt.target.closest(".button").classList.add("active");
}

function removeActiveClass(evt) {
    evt.target.closest(".button").classList.remove("active");
}